<template>
  <div id="container"></div>
</template>

<script>
import { mapState } from "vuex";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

export default {
  name: "Scene",
  data() {
    return {
      camera: null,
      scene: null,
      controls: null,
      renderer: null,
      mesh: null,
      sizes: {
        width: null,
        height: null,
      },
      aspect: null,
    };
  },
  computed: mapState(["cameraPosition"]),
  watch: {
    cameraPosition(value) {
      console.log("Update", value);
      let camera = this.camera;
      let center = new THREE.Vector3(0, 0, 0)
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
  },
  methods: {
    init() {
      let container = document.getElementById("container");

      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerWidth;

      this.camera = new THREE.PerspectiveCamera(
        70,
        this.sizes.width / this.sizes.height,
        0.01,
        10
      );
      this.camera.position.z = 4;

      this.scene = new THREE.Scene();

      this.controls = new OrbitControls(this.camera, container);
      // this.controls.minPolarAngle = Math.PI / 4;
      // this.controls.maxPolarAngle = Math.PI / 2 + Math.PI / 4;
      // this.controls.enableDamping = true;

      let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
      let material = new THREE.MeshNormalMaterial();

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);
    },
    resizeCanvas() {
      console.log("resize");
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