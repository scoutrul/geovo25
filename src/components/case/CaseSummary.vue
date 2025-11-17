<template>
  <div
    class="case-summary"
    :class="[
      gtXl
        ? 'w-[438px] flex flex-col gap-16 px-8 py-40 h-full'
        : gtLg
          ? 'sticky bottom-0 left-0 right-0 backdrop-blur-[20px] bg-white-100/80 px-10 py-6'
          : 'sticky bottom-0 left-0 right-0 backdrop-blur-[20px] bg-white-100/80 px-4 py-4',
    ]"
  >
    <div
      class="flex flex-col w-full"
      :class="[gtXl ? 'gap-6' : gtLg ? 'gap-6' : 'gap-4']"
    >
      <!-- Мета-информация -->
      <div
        v-for="(item, index) in metaItems"
        :key="index"
        class="flex flex-col"
      >
        <BaseText :as="'div'" size="p2" class="text-black-90">
          {{ item.value }}
        </BaseText>
        <BaseText :as="'div'" size="p2" class="text-black-50">
          {{ item.label }}
        </BaseText>
      </div>
    </div>

    <!-- Кнопка "Следующий кейс" -->
    <div v-if="nextCase" class="w-full">
      <router-link
        :to="`/cases/${nextCase.slug}`"
        class="btn-next-case flex items-center justify-center h-12 px-6 py-2 rounded-lg border border-black-70 text-black-90 text-p2 transition-colors hover:bg-white-90 active:bg-white-80"
      >
        Следующий кейс
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base/index.js";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  metaItems: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item.value === "string" && typeof item.label === "string"
      );
    },
  },
  nextCase: {
    type: Object,
    default: null,
    validator: (nextCase) => {
      if (!nextCase) return true;
      return (
        typeof nextCase.slug === "string" && typeof nextCase.title === "string"
      );
    },
  },
});
</script>

<style scoped>
.case-summary {
  @apply relative;
}

.btn-next-case {
  @apply cursor-pointer;
}
</style>
