<template>
  <component :is="as" :class="containerClasses" v-bind="$attrs">
    <div
      class="flex flex-col items-start w-full max-w-[1048px] xl:max-w-[1592px] mx-auto"
      :style="{ maxWidth: maxWidth }"
    >
      <slot />
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  bg: {
    type: String,
    default: "",
    validator: (value) => {
      if (value === "") return true;
      return ["white", "black"].includes(value);
    },
  },
  as: {
    type: String,
    default: "div",
  },
  maxWidth: {
    type: String,
    default: "full",
  },
});

const containerClasses = computed(() => {
  const baseClasses =
    "w-full px-4 py-16 md:px-10 lg:px-16 xl:py-40 xl:py-40 overflow-hidden";

  // Фон: маппинг простых ключей на классы Tailwind
  let bgClasses = "";
  if (props.bg === "white") {
    bgClasses = "bg-white-90";
  } else if (props.bg === "black") {
    bgClasses = "bg-black-90";
  }

  return [baseClasses, bgClasses].filter(Boolean).join(" ");
});
</script>
