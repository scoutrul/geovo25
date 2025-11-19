<template>
  <div
    class="flex flex-col md:flex-row xl:flex-col gap-4 md:sticky"
    :class="[
      gtXl
        ? 'flex flex-col gap-16 bg-transparent'
        : gtLg
          ? 'px-10 py-6 bg-white-100/80'
          : 'px-4 py-4 bg-white-100/80',
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
      {{ buttonText }}
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { BaseButton } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useContentStore } from "@/stores";

const router = useRouter();
const contentStore = useContentStore();
const { gtLg, gtXl } = useBreakpoints();

const buttonText = computed(() => contentStore.meta.nextCaseButton || "Next case");

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
