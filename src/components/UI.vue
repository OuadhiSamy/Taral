<template>
  <div id="UI">
    <transition @enter="closeEnter" @leave="closeLeave">
      <div class="close-button" v-if="currentPanel !== ''" @click="close()">
        X
      </div>
    </transition>
    
    <transition @enter="navEnter" @leave="navLeave">
      <nav id="nav" class="nav" v-if="currentPanel === ''">
        <div class="nav__item" @click="currentPanel = 'arcane-selector'">
          Arcane
        </div>
        <div class="nav__item" @click="currentPanel = 'font-settings'">
          Font
        </div>
        <div class="nav__item" @click="currentPanel = 'layout-selector'">
          Layout
        </div>
      </nav>
    </transition>

    <transition @enter="arcaneEnter" @leave="arcaneLeave">
      <arcane-selector
        v-if="currentPanel === 'arcane-selector'"
        @onCloseClicked="currentPanel = ''"
      />
    </transition>

    <transition @enter="fontEnter" @leave="fontLeave">
      <font-modifier
        v-if="currentPanel === 'font-settings'"
        @onCloseClicked="currentPanel = ''"
      />
    </transition>

    <transition @enter="fontEnter" @leave="fontLeave">
      <layout-selector
        v-if="currentPanel === 'layout-selector'"
        @onCloseClicked="currentPanel = ''"
      />
    </transition>
  </div>
</template>

<script>
import LayoutSelector from "./Interface/LayoutSelector.vue";
import ArcaneSelector from "./Interface/ArcaneSelector.vue";
import FontModifier from "./Interface/FontModifier.vue";

import { gsap } from "gsap";

export default {
  name: "UI",
  components: {
    LayoutSelector,
    ArcaneSelector,
    FontModifier,
  },
  data() {
    return {
      currentPanel: "",
    };
  },
  methods: {
    close() {
      this.currentPanel = "";
    },
    sepEnter(el, done) {
      return gsap
        .timeline({ onComplete: done })
        .from(".font-modifier__border", {
          duration: 1,
          height: 0,
          ease: "power3",
        });
    },
    sepLeave(el, done) {
      return gsap.timeline({ onComplete: done }).to(".font-modifier__border", {
        duration: 1,
        height: 0,
        delay: 1,
        ease: "power3",
      });
    },
    navEnter(el, done) {
      return gsap.timeline({ onComplete: done }).from(".nav__item", {
        duration: 1,
        opacity: 0,
        y: 10,
        delay: 1,
        stagger: 0.1,
        ease: "power3",
      });
    },
    navLeave(el, done) {
      return gsap.timeline({ onComplete: done }).to(".nav__item", {
        duration: 1,
        opacity: 0,
        y: 10,
        stagger: 0.1,
        ease: "power3",
      });
    },

    arcaneEnter(el, done) {
      return gsap
        .timeline({ onComplete: done })
        .from(".arcane-selector__list", {
          duration: 1,
          opacity: 0,
          y: -10,
          delay: 1.1,
          ease: "power3",
        });
    },
    arcaneLeave(el, done) {
      return gsap.timeline({ onComplete: done }).to(".arcane-selector__list", {
        duration: 1,
        opacity: 0,
        y: -10,
        ease: "power3",
      });
    },

    fontEnter(el, done) {
      this.sepEnter();
      return gsap.timeline({ onComplete: done }).from(".font-anim", {
        duration: 1,
        opacity: 0,
        y: 10,
        stagger: 0.1,
        delay: 1,
        ease: "power3",
      });
    },
    fontLeave(el, done) {
      this.sepLeave();
      return gsap.timeline({ onComplete: done }).to(".font-anim", {
        duration: 1,
        opacity: 0,
        y: 10,
        stagger: 0.1,
        ease: "power3",
      });
    },

    closeEnter(el, done) {
      return gsap.timeline({ onComplete: done }).to(".close-button", {
        duration: 1,
        opacity: 1,
        stagger: 0.1,
        ease: "power3",
      });
    },
    closeLeave(el, done) {
      return gsap.timeline({ onComplete: done }).to(".close-button", {
        duration: 1,
        opacity: 0,
        stagger: 0.1,
        ease: "power3",
      });
    },
  },
};
</script>

<style lang="scss">
.nav {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 200px;

  &__item {
    color: white;
    cursor: pointer;
  }
}
</style>