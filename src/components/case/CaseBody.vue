<template>
  <section class="case-body bg-white-90">
    <div class="w-full" :class="[gtXl ? 'flex items-start' : 'flex flex-col']">
      <!-- Контент -->
      <div
        class="case-body__content"
        :class="[
          gtXl
            ? 'w-[1051px] px-16 py-40'
            : gtLg
              ? 'w-full px-10 py-40'
              : 'w-full px-4 py-16',
        ]"
      >
        <div class="flex flex-col gap-24">
          <!-- Итерация по секциям -->
          <div
            v-for="(section, sectionIndex) in sections"
            :key="sectionIndex"
            class="flex flex-col gap-14"
          >
            <!-- Заголовок секции -->
            <BaseHeading :level="4" :as="'h2'" class="text-black-90">
              {{ section.title }}
            </BaseHeading>

            <!-- Блоки контента -->
            <div class="flex flex-col gap-14">
              <!-- Блок с текстом и/или изображением -->
              <template
                v-for="(block, blockIndex) in section.blocks"
                :key="blockIndex"
              >
                <!-- Обычный блок контента -->
                <CaseContentBlock
                  v-if="block.type !== 'testimonial'"
                  :block="block"
                />

                <!-- Блок с отзывом -->
                <CaseTestimonial
                  v-else
                  :quote="block.quote"
                  :author="block.author"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary (только на desktop) -->
      <CaseSummary
        v-if="gtXl"
        :meta-items="metaItems"
        :next-case="nextCase"
        class="sticky top-24"
      />
    </div>

    <!-- Summary для mobile/tablet -->
    <CaseSummary v-if="!gtXl" :meta-items="metaItems" :next-case="nextCase" />
  </section>
</template>

<script setup>
import { BaseHeading } from "@/components/base/index.js";
import CaseContentBlock from "@/components/case/CaseContentBlock.vue";
import CaseTestimonial from "@/components/case/CaseTestimonial.vue";
import CaseSummary from "@/components/case/CaseSummary.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  sections: {
    type: Array,
    required: true,
  },
  metaItems: {
    type: Array,
    required: true,
  },
  nextCase: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.case-body {
  @apply relative min-h-screen;
}
</style>
