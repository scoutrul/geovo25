<template>
  <div class="page-layout bg-black-90 min-h-screen">
    <StickyHeader
      v-bind="headerProps"
      @cta-click="$emit('header-cta-click')"
      @nav-click="$emit('header-nav-click', $event)"
      @language-change="handleLanguageChange"
    />

    <main class="min-h-screen" role="main">
      <slot />
    </main>

    <BenefitsSection
      v-bind="computedFooterProps"
      @cta-click="$emit('footer-cta-click')"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import StickyHeader from "@/components/sections/StickyHeader.vue";
import BenefitsSection from "@/components/sections/BenefitsSection.vue";
import { useLanguageStore, useContentStore } from "@/stores";

const languageStore = useLanguageStore();
const contentStore = useContentStore();

const props = defineProps({
  // Header props
  headerTheme: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  // Footer props (для дополнительных атрибутов типа id, aria-labelledby)
  footerProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "header-cta-click",
  "header-nav-click",
  "language-change",
  "footer-cta-click",
]);

// Собираем props для хедера из store
const headerProps = computed(() => ({
  slogan: contentStore.header.slogan,
  navigationItems: contentStore.header.navigationItems,
  languages: contentStore.header.languages,
  currentLanguage: languageStore.currentLanguage,
  theme: props.headerTheme,
  buttonText: contentStore.hero.buttonText,
}));

// Собираем props для футера из store
const computedFooterProps = computed(() => ({
  title: contentStore.benefits.title,
  benefits: contentStore.benefits.items,
  ctaText: contentStore.benefits.ctaText,
  ctaButtonText: contentStore.benefits.ctaButtonText,
  ...props.footerProps, // Дополнительные атрибуты (id, aria-labelledby и т.д.)
}));

// Обработчик смены языка
function handleLanguageChange(code) {
  languageStore.setLanguage(code);
  emit("language-change", code);
}
</script>

<style scoped>
.page-layout {
  @apply relative;
}
</style>
