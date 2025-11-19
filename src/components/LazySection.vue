<template>
  <div ref="targetRef" :style="{ minHeight: minHeight }">
    <component :is="asyncComponent" v-if="isVisible" v-bind="$attrs" />
  </div>
</template>

<script setup>
import { useLazySection } from "@/composables/useLazySection.js";

const props = defineProps({
  component: {
    type: Function,
    required: true,
  },
  minHeight: {
    type: String,
    default: "auto",
  },
  rootMargin: {
    type: String,
    default: "200px",
  },
});

const { isVisible, targetRef } = useLazySection({
  rootMargin: props.rootMargin,
});

const asyncComponent = props.component;
</script>

