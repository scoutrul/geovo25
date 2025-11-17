<template>
  <section
    class="case-hero bg-white-90 overflow-hidden"
    :class="[
      'px-4 md:px-10 xl:px-16',
      'pt-[128px] pb-16 md:pt-[160px] md:pb-24 xl:pt-[200px] xl:pb-16',
    ]"
  >
    <div
      class="max-w-[1592px] mx-auto w-full"
      :class="[
        gtXl ? 'flex items-start justify-between' : 'flex flex-col gap-16',
      ]"
    >
      <!-- Левая колонка: Заголовок и статистики -->
      <div
        class="flex flex-col justify-between h-full"
        :class="[gtXl ? 'w-[1051px]' : 'w-full']"
      >
        <!-- Заголовок -->
        <div class="mb-16 xl:mb-0">
          <BaseHeading :level="gtXl ? 3 : 4" :as="'h1'" class="text-black-90">
            {{ title }}
          </BaseHeading>
        </div>

        <!-- Статистики -->
        <div class="grid gap-8" :class="[gtLg ? 'grid-cols-2' : 'grid-cols-2']">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="flex flex-col gap-2"
          >
            <BaseHeading
              :level="gtLg ? 4 : 5"
              :as="'div'"
              class="text-black-90"
            >
              {{ stat.value }}
            </BaseHeading>
            <BaseText
              :as="'p'"
              :size="gtLg ? 'p1' : 'p2'"
              class="text-black-50"
            >
              {{ stat.description }}
            </BaseText>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Мета-информация (только на desktop) -->
      <div v-if="!gtXl" class="flex flex-col gap-6">
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
    </div>
  </section>
</template>

<script setup>
import { BaseHeading, BaseText } from "../base";
import { useBreakpoints } from "../../composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
    validator: (stats) => {
      return stats.every(
        (stat) =>
          typeof stat.value === "string" && typeof stat.description === "string"
      );
    },
  },
  metaItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.case-hero {
  @apply relative;
}
</style>
