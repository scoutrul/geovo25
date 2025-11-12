<template>
  <div class="relative md:overflow-hidden">
    <div class="stats-gradient"></div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="flex flex-col gap-4"
      >
        <BaseText :as="'p'" size="h5" class="text-white-100">
          {{ stat.value }}
        </BaseText>
        <BaseText :as="'p'" size="p2" class="text-black-70">
          {{ stat.description }}
        </BaseText>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseText } from "../base";

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.stats-gradient {
  height: 100%;
  position: absolute;
  left: -16px;
  right: -16px;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0) 73%,
    rgb(22 22 22) 97%
  );
  @apply hidden xl:block;
}
</style>
