<template>
  <BaseContainer
    as="section"
    bg="white"
    class="case-hero pt-[128px] md:pt-[160px] xl:pt-[200px] !pb-16 md:!pb-24 xl:!pb-16"
  >

    <div
    class="flex gap-16 fixed top-[128px] md:top-[160px] xl:top-[200px] left-[16px] right-[16px] md:left-[32px] md:right-[32px] lg:left-[64px] lg:right-[64px] z-0 max-w-[100vw] xl:max-w-[1592px] xl:left-auto xl:right-auto xl:pr-16"
      :class="[
        gtXl ? 'items-start justify-between' : 'flex-col',
      ]"
    >
      <div
        class="flex flex-col"
        :class="[
          gtXl 
            ? 'min-h-[505px] justify-between' 
            : 'gap-16'
        ]"
      >
        <!-- Заголовок -->
        <div>
          <BaseHeading :level="gtXl ? 3 : 4" :as="'h1'" class="text-black-90">
            {{ title }}
          </BaseHeading>
        </div>

        <!-- Статистики -->
        <div class="grid gap-8 grid-cols-2">
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

      <CaseMetaList :variant="gtSm ? 'horizontal' : 'vertical'" :items="metaItems" />
    </div>

    <!-- Дубликат для fixed эффекта -->
    <div
    class="flex gap-16 relative z-9 opacity-0"
      :class="[
        gtXl ? 'items-start justify-between' : 'flex-col',
      ]"
    >
      <div
        class="flex flex-col"
        :class="[
          gtXl 
            ? 'min-h-[505px] justify-between' 
            : 'gap-16'
        ]"
      >
        <!-- Заголовок -->
        <div>
          <BaseHeading :level="gtXl ? 3 : 4" :as="'h1'" class="text-black-90">
            {{ title }}
          </BaseHeading>
        </div>

        <!-- Статистики -->
        <div class="grid gap-8 grid-cols-2">
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

      <CaseMetaList :variant="gtSm ? 'horizontal' : 'vertical'" :items="metaItems" />
    </div>

  </BaseContainer>
</template>

<script setup>
import { BaseHeading, BaseText, BaseContainer } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl, gtSm } = useBreakpoints();

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
