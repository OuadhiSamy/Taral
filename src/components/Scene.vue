<template>
  <div id="container"></div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
      card: null,
      layout: null,
      shader: null,
      aspect: null,
      textureLoader: null,
      loadingManager: null,
      alphaTexture: null,
      sizes: {
        width: null,
        height: null,
      },
      cardSettings: {
        width: 3.8,
        height: 6,
        thickness: 0.1,
        margin: 0.38,
      },
    };
  },
  // computed: mapState(["cameraPosition"]),
  computed: mapState({
    layoutArray: state => state.layoutArray,
    layoutTextureArray: state => state.layoutTextureArray,
    layoutTexture: state => state.layoutTexture, 
    cameraPosition: state => state.cameraPosition, 
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
      console.log("watch",this.layout.material)
      this.layout.material.map = value;
    }
  },
  methods: {
    init() {
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
        },

        // Progress
        () => {
          console.log("progress");
        }
      );

      this.textureLoader = new THREE.TextureLoader(this.loadingManager);

      this.alphaTexture = this.textureLoader.load("./sword_alpha.png");

      for (let i = 0; i < this.layoutArray.length; i++) {
        this.layoutTextureArray.push({id:i, texture:this.textureLoader.load(`./${this.layoutArray[i]}.png`)}) 
      }

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);
    },

    setUpCard() {
      /**
       * Card
       */
      this.card = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.8, 6, 0.11),
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
      // let currentTexture = this.$store.getters.getLayoutTexture(this.currentLayout);
      // this.layoutTexture = this.layoutTextureArray[0].texture;
      // let layoutTexture = this.$store.commit('updateLayoutTexture', 0);
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
      // const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
      pointLight.position.set(0, -1.4, 10);
      this.scene.add(pointLight);
      // scene.add(pointLightHelper);

      const dirLight = new THREE.PointLight(0xffffff, 0.2);
      // const dirLightHelper = new THREE.PointLightHelper(dirLight, 5);
      dirLight.position.set(20, -0.3, -7.2);
      this.scene.add(dirLight);
      // scene.add(dirLightHelper);

      // let lightFolder = gui.addFolder("Lights");
      // lightFolder.add(dirLight.position, "x", -10, 10).name("x");
      // lightFolder.add(dirLight.position, "y", -10, 10).name("y");
      // lightFolder.add(dirLight.position, "z", -10, 10).name("z");
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