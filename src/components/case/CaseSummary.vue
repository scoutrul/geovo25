<template>
  <div
    class="case-summary"
    :class="[
      gtXl
        ? 'flex flex-col gap-16'
        : gtLg
          ? 'sticky bottom-0 left-0 right-0 backdrop-blur-[20px] bg-white-100/80 px-10 py-6'
          : 'sticky bottom-0 left-0 right-0 backdrop-blur-[20px] bg-white-100/80 px-4 py-4',
    ]"
  >
    <!-- Мета-информация -->
    <CaseMetaList
      :items="metaItems"
      :style="{ minHeight: gtXl ? '660px' : '100%' }"
    />

    <!-- Кнопка "Следующий кейс" -->
    <BaseButton
      v-if="nextCase"
      variant="secondary"
      size="md"
      @click="navigateToNextCase"
    >
      Следующий кейс
    </BaseButton>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { BaseButton } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const router = useRouter();
const { gtLg, gtXl } = useBreakpoints();

const props = defineProps({
  metaItems: {
    type: Array,
    required: true,
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

const navigateToNextCase = () => {
  if (props.nextCase?.slug) {
    router.push(`/cases/${props.nextCase.slug}`);
  }
};
</script>
