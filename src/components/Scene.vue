<template>
  <div id="container"></div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { gsap } from "gsap";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export default {
  name: "Scene",
  data() {
    return {
      clock: null,
      camera: null,
      scene: null,
      controls: null,
      renderer: null,
      effectComposer: null,
      card: null,
      layout: null,
      shader: null,
      aspect: null,
      loadingManager: null,
      textureLoader: null,
      fontLoader: null,
      alphaTexture: null,
      sizes: {
        width: null,
        height: null,
      },
      cardSettings: {
        width: 3.8,
        height: 6,
        thickness: 0.05,
        margin: 0.38,
      },
      textData: {
        // TODO : move needed to store
        text: "XIX",
        size: 0.15,
        height: 0.1,
        curveSegments: 12,
        font: "Elgoc",
        weight: "Black",
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0.0,
        bevelSegments: 3,
        posX: -1,
      },
      font: null,
      gui: null,
      text: null,
      number: null,
      matcap: null,
    };
  },
  computed: mapState({
    layoutArray: (state) => state.layoutArray,
    layoutTextureArray: (state) => state.layoutTextureArray,
    layoutTexture: (state) => state.layoutTexture,
    cameraPosition: (state) => state.cameraPosition,
    numberSize: (state) => state.numberSize,
  }),
  watch: {
    cameraPosition(value) {
      console.log("Update", value);
      let camera = this.camera;
      let center = new THREE.Vector3(0, 0, 0);
      gsap.to(this.camera.position, {
        x: value.posX,
        y: value.posY,
        z: value.posZ,
        duration: 1,
        ease: "power3.inOut",
        onUpdate() {
          camera.lookAt(center);
        },
      });
    },
    layoutTexture(value) {
      this.layout.material.map = value;
    },
    numberSize(value) {
      console.log(this.number.scale);
      this.number.scale.set(value, value, 1);
    },
  },
  methods: {
    init() {
      this.gui = new dat.GUI();
      this.clock = new THREE.Clock();
      let container = document.getElementById("container");

      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerWidth;

      this.camera = new THREE.PerspectiveCamera(
        75,
        this.sizes.width / this.sizes.height,
        0.01,
        100
      );
      this.camera.position.set(0, 4, 10);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x3d3d3d);

      this.controls = new OrbitControls(this.camera, container);
      this.controls.minPolarAngle = Math.PI / 4;
      this.controls.maxPolarAngle = Math.PI / 2 + Math.PI / 4;
      this.controls.enableDamping = true;

      this.loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {
          console.log("loaded");
          this.setUpCard();
          this.setUpLights();
          this.generateText();
        },

        // Progress
        () => {
          console.log("progress");
        },

        // Error
        (err) => {
          console.error(err);
        }
      );

      this.textureLoader = new THREE.TextureLoader(this.loadingManager);
      this.fontLoader = new THREE.FontLoader(this.loadingManager);
      this.alphaTexture = this.textureLoader.load("./force_alpha.png");
      this.matcap = this.textureLoader.load("./matcap.jpg");
      this.fontLoader.load("./Elgoc_Black.json", (font) => {
        this.font = font;
      });

      for (let i = 0; i < this.layoutArray.length; i++) {
        this.layoutTextureArray.push({
          id: i,
          texture: this.textureLoader.load(`./${this.layoutArray[i]}.png`),
        });
      }

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ReinhardToneMapping;
      this.renderer.toneMappingExposure = 1.5;
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);

      // /**
      //  * Post processing
      //  */
      // // Renderer target
      // const renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
      //   minFilter: THREE.LinearFilter,
      //   maxFilter: THREE.LinearFilter,
      //   format: THREE.RGBAFormat,
      //   encoding: THREE.sRGBEncoding,
      // });

      // // Composer
      // this.effectComposer = new EffectComposer(this.renderer, renderTarget);
      // this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // this.effectComposer.setSize(this.sizes.width, this.sizes.height);

      // // Passes
      // const renderPass = new RenderPass(this.scene, this.camera);
      // this.effectComposer.addPass(renderPass);

      // const smaaPass = new SMAAPass();
      // smaaPass.enabled = false;
      // this.effectComposer.addPass(smaaPass);
    },

    setUpCard() {
      /**
       * Card
       */
      this.card = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.8, 6, 0.05),
        new THREE.MeshPhysicalMaterial({
          color: 0x000000,
          metalness: 0,
          roughness: 1,
          clearcoat: 0.5,
          clearcoatRoughness: 0.5,
        })
      );

      this.card.position.set(0, 0, 0);
      this.scene.add(this.card);

      /**
       * Layout
       */
      this.$store.commit("updateLayoutTexture", 1);
      this.layout = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(6, 6),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: this.layoutTexture,
          transparent: true,
        })
      );

      this.layout.position.set(0, 0, 0.056);
      this.scene.add(this.layout);

      /**
       * Shader plane
       */
      this.shader = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(
          this.cardSettings.width,
          this.cardSettings.width
        ),
        new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          transparent: true,
          uniforms: {
            uAlphaMap: { value: this.alphaTexture },
            uTime: { value: 0 },
            uNegateMask: { value: 0 },
          },
        })
      );
      this.shader.position.set(0, 0, 0.057);
      this.shader.geometry.rotateZ(0.01);
      this.scene.add(this.shader);
    },

    setUpLights() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 10);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xcc9200, 1);
      pointLight.position.set(0, -1.4, 10);
      this.scene.add(pointLight);

      const dirLight = new THREE.PointLight(0xffffff, 0.2);
      dirLight.position.set(20, -0.3, -7.2);
      this.scene.add(dirLight);
    },

    generateText() {
      const numberGeometry = new THREE.TextGeometry(this.textData.text, {
        font: this.font,
        size: this.textData.size,
        height: this.textData.height,
        curveSegments: this.textData.curveSegments,
        bevelEnabled: this.textData.bevelEnabled,
        bevelThickness: this.textData.bevelThickness,
        bevelSize: this.textData.bevelSize,
        bevelOffset: this.textData.bevelOffset,
        bevelSegments: this.textData.bevelSegments,
      });

      const textGeometry = new THREE.TextGeometry("The Force", {
        font: this.font,
        size: this.textData.size,
        height: this.textData.height,
        curveSegments: this.textData.curveSegments,
        bevelEnabled: this.textData.bevelEnabled,
        bevelThickness: this.textData.bevelThickness,
        bevelSize: this.textData.bevelSize,
        bevelOffset: this.textData.bevelOffset,
        bevelSegments: this.textData.bevelSegments,
      });

      textGeometry.center();
      numberGeometry.center();

      this.number = new THREE.Mesh(
        numberGeometry,
        new THREE.MeshMatcapMaterial({ map: this.matcap })
      );
      this.text = new THREE.Mesh(
        textGeometry,
        new THREE.MeshMatcapMaterial({ map: this.matcap })
      );

      this.number.position.y = 2.4;
      this.text.position.y = -2.4;

      this.scene.add(this.number, this.text);

      // this.initGUI();
    },

    initGUI() {
      const folder = this.gui.addFolder("THREE.TextGeometry");
      folder.add(this.text.position, "x", -3, 3, 0.1);
      folder.add(this.text.position, "y", -3, 3, 0.1);
    },

    resizeCanvas() {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },

    animate() {
      requestAnimationFrame(this.animate);

      // Update controls
      this.controls.update();

      const elapsedTime = this.clock.getElapsedTime();

      // Update shader material
      if (this.shader) this.shader.material.uniforms.uTime.value = elapsedTime;
      this.renderer.render(this.scene, this.camera);
      // this.effectComposer.render();
    },
  },
  mounted() {
    this.init();
    this.animate();

    this.$nextTick(() => {
      window.addEventListener("resize", this.resizeCanvas);
    });

    this.resizeCanvas();
  },
};
</script>

<style>
</style>