<template>
  <BaseContainer
    as="section"
    bg="white"
    class="case-hero pt-[128px] md:pt-[160px] xl:pt-[200px] !pb-16 md:!pb-24 xl:!pb-16"
  >
    <div
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
      <CaseMetaList :variant="gtXl ? 'vertical' : 'horizontal'" :items="metaItems" gap="gap-6" />
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseHeading, BaseText, BaseContainer } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

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
