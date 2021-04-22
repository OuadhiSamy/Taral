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
      gui: null,
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
      sizes: {
        width: null,
        height: null,
      },
      textData: {
        // TODO : move needed to store
        text: "XIX",
        size: 0.15,
        height: 0.04,
        // height: 1,
        curveSegments: 12,
        font: "Elgoc",
        weight: "Black",
      },
      TextMeshes: {
        nb: null,
        name: null,
      },
      font: null,
      matcap: null,
    };
  },
  computed: mapState({
    contentMap: "contentMap",
    layoutMap: "layoutMap",
    fontMap: "fontMap",
    // TODO : Store textures in cards settings ?
    layoutTexture: "layoutTexture",
    alphaTexture: "alphaTexture",
    cameraPosition: "cameraPosition",
    numberSize: "numberSize",
    cardSettings: "cardSettings",
    nbSize: (state) => state.cardSettings.text.nb.size,
    nameSize: (state) => state.cardSettings.text.name.size,
    fontId: (state) => state.cardSettings.fontId,
    displayMode: (state) => state.cardSettings.displayMode,
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
    alphaTexture(value) {
      this.updateCard(value);
    },
    layoutTexture(value) {
      this.layout.material.map = value;
      this.updateTextPos();
    },
    nbSize(value) {
      this.TextMeshes.nb.scale.set(value, value, 1);
    },
    nameSize(value) {
      this.TextMeshes.name.scale.set(value, value, 1);
    },
    fontId() {
      this.generateText();
    },
    displayMode() {
      this.generateText();
    },
  },
  methods: {
    init() {
      // this.gui = new dat.GUI();
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
      this.camera.position.set(0, -1, 5);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x141414);

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

      this.contentMap.forEach((content) => {
        content.texture = this.textureLoader.load(
          `./${content.name}_alpha.png`
        );
      });

      this.fontMap.forEach((font) => {
        this.fontLoader.load(`./${font.name}.json`, (e) => {
          font.font = e;
        });
      });

      console.log("FontMap", this.fontMap);

      this.layoutMap.forEach((layout) => {
        layout.texture = this.textureLoader.load(`./${layout.name}.png`);
      });

      this.matcap = this.textureLoader.load("./matcap.jpg");

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

      this.$store.commit("updateAlphaTexture", 19);
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
      // Remove objects from scene
      if (this.TextMeshes.name) {
        this.scene.remove(this.TextMeshes.nb, this.TextMeshes.name);
        // Dispose old text
        this.TextMeshes.nb.geometry.dispose();
        this.TextMeshes.nb.material.dispose();
        this.TextMeshes.name.geometry.dispose();
        this.TextMeshes.name.material.dispose();
      }

      // Get content by id
      let contentInfos = this.contentMap.find(
        (data) => data.id === this.cardSettings.id
      );
      if (contentInfos === undefined)
        throw new Error(
          `[TARAL] Content with id ${this.cardSettings.id} not found.`
        );

      let fontInfos = this.fontMap.find(
        (data) => data.id === this.cardSettings.fontId
      );
      if (fontInfos === undefined)
        throw new Error(
          `[TARAL] Font with id ${this.cardSettings.fontId} not found.`
        );

      console.log(fontInfos.name);
      let fontSettings = {
        font: fontInfos.font,
        size: this.textData.size,
        height: this.textData.height,
        curveSegments: this.textData.curveSegments,
      };

      let number = this.displayMode == 0 ? contentInfos.rNumber : contentInfos.id.toString(); 
      console.log("Display mode",this.displayMode,number)
      const numberGeometry = new THREE.TextBufferGeometry(
        number,
        fontSettings
      );
      const TextBufferGeometry = new THREE.TextBufferGeometry(
        contentInfos.title,
        fontSettings
      );

      TextBufferGeometry.center();
      numberGeometry.center();

      this.TextMeshes.nb = new THREE.Mesh(
        numberGeometry,
        new THREE.MeshMatcapMaterial({ map: this.matcap })
      );
      this.TextMeshes.name = new THREE.Mesh(
        TextBufferGeometry,
        new THREE.MeshMatcapMaterial({ map: this.matcap })
      );

      this.TextMeshes.nb.scale.set(this.nbSize, this.nbSize, 1);
      this.TextMeshes.name.scale.set(this.nameSize, this.nameSize, 1);

      this.updateTextPos();

      this.scene.add(this.TextMeshes.nb, this.TextMeshes.name);

      console.log("Generate text", this.scene);
      // this.initGUI();
    },

    updateCard(alpha) {
      this.shader.material.uniforms["uAlphaMap"].value = alpha;

      // generate new texts with store values
      this.generateText();
    },

    updateTextPos() {
      let layoutInfos = this.layoutMap.find(
        (data) => data.id === this.cardSettings.layoutId
      );
      if (layoutInfos === undefined)
        throw new Error(
          `[TARAL] Layout with id ${this.cardSettings.layoutId} not found.`
        );

      console.log("Position", layoutInfos.nbPos);

      this.TextMeshes.name.position.z = this.textData.height / 2;
      this.TextMeshes.name.position.y = -2.4;

      this.TextMeshes.nb.position.set(
        layoutInfos.nbPos.x,
        layoutInfos.nbPos.y,
        this.textData.height / 2
      );
    },

    initGUI() {
      const folder = this.gui.addFolder("THREE.TextBufferGeometry ");
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