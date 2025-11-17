<template>
  <section class="case-overview bg-white-100 rounded-t-[32px] overflow-hidden">
    <BaseContainer
      :as="'div'"
      bg=""
      class="!bg-transparent !px-4 md:!px-10 xl:!px-16 !py-32 xl:!py-40"
    >
      <div
        class="w-full max-w-[1592px] mx-auto"
        :class="[
          gtXl
            ? 'grid grid-cols-[1fr_2fr_2fr] gap-8'
            : gtLg
              ? 'flex flex-col gap-16'
              : 'flex flex-col gap-8',
        ]"
      >
        <!-- Заголовок секции -->
        <BaseText
          :as="'h2'"
          size="p1"
          class="text-black-50"
          :class="gtXl ? '' : 'mb-8'"
        >
          {{ title }}
        </BaseText>

        <!-- Текстовые блоки -->
        <BaseHeading
          v-for="(section, index) in sections"
          :key="index"
          :level="5"
          :as="'div'"
          class="text-black-90"
        >
          {{ section.text }}
        </BaseHeading>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText } from "@/components/base/index.js";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  title: {
    type: String,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
    validator: (sections) => {
      return sections.every((section) => typeof section.text === "string");
    },
  },
});
</script>
