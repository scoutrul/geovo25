<template>
  <div
    class="flex flex-col w-full"
    :class="gap"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col"
    >
      <BaseText :as="'div'" :size="valueSize" class="text-black-90">
        {{ item.value }}
      </BaseText>
      <BaseText :as="'div'" :size="labelSize" class="text-black-50">
        {{ item.label }}
      </BaseText>
    </div>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base/index.js";

defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item.value === "string" && typeof item.label === "string"
      );
    },
  },
  gap: {
    type: String,
    default: "gap-6",
  },
  valueSize: {
    type: String,
    default: "p2",
  },
  labelSize: {
    type: String,
    default: "p2",
  },
  variant: {
    type: String,
    default: "horizontal",
  },
});
</script>

