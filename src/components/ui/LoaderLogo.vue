<template>
  <div class="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
    <svg
      viewBox="0 0 102 101"
      class="w-full h-full text-white-90"
      aria-hidden="true"
    >
      <path
        ref="strokePath"
        d="M25.8413 50.1182H39.4572L50.726 61.2892L62.0544 50.1564H102L50.7112 101L0 50.7291L51.1733 0V13.4977L13.6159 50.7291L50.7112 87.5023L78.7562 59.7007H66.0179L50.6964 74.7576L25.8413 50.1182Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/all";

gsap.registerPlugin(DrawSVGPlugin);

const strokePath = ref(null);
let strokeTimeline = null;

const cleanup = () => {
  if (strokeTimeline) {
    strokeTimeline.kill();
    strokeTimeline = null;
  }

};

const initAnimation = () => {
  cleanup();

  if (!strokePath.value) return;

  strokeTimeline = gsap
    .timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 1.8, ease: "power2.inOut" },
    })
    .fromTo(strokePath.value, { drawSVG: "0%" }, { drawSVG: "100%" });
};

onBeforeUnmount(() => {
  cleanup();
});

onMounted(() => {
  initAnimation();
});
</script>

