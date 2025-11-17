<template>
  <component :is="tag" :class="headingClasses" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  level: {
    type: [Number, String],
    default: 2,
    validator: (value) =>
      value === null || [1, 2, 3, 4, 5, 6].includes(Number(value)),
  },
  as: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
    validator: (value) =>
      value === null || ["h5", "p1", "p2", "p3"].includes(value),
  },
});

const tag = computed(() => {
  return props.as || `h${props.level}`;
});

const headingClasses = computed(() => {
  const baseClasses = "font-medium";

  // Если передан size, используем его, иначе используем level
  let sizeClass = "";
  if (props.size) {
    const sizeClasses = {
      h5: "text-h5",
      p1: "text-p1",
      p2: "text-p2",
      p3: "text-p3",
    };
    sizeClass = sizeClasses[props.size];
  } else if (props.level !== null) {
    const levelClasses = {
      1: "text-h1",
      2: "text-h2",
      3: "text-h3",
      4: "text-h4",
      5: "text-h5",
      6: "text-lg leading-normal",
    };
    sizeClass = levelClasses[Number(props.level)];
  }

  return [baseClasses, sizeClass].filter(Boolean).join(" ");
});
</script>
