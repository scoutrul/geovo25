<template>
  <div class="page-layout bg-black-90 min-h-screen">
    <!-- Прелоадер - черный экран -->
    <Transition name="fade" mode="out-in">
      <div
        v-if="isLoading"
        class="fixed inset-0 bg-black-90 z-50 flex items-center justify-center"
      >
        <div class="flex flex-col items-center gap-4">
          <!-- Процент загрузки -->
          <div class="text-white-100 text-4xl font-medium tabular-nums">
            {{ loadingProgress }}%
          </div>
          
          <!-- Прогресс бар -->
          <div class="w-48 h-1 bg-white-20 rounded-full overflow-hidden">
            <div
              class="h-full bg-white-100 transition-all duration-300 ease-out"
              :style="{ width: `${loadingProgress}%` }"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Основной контент -->
    <Transition name="fade" mode="out-in">
      <div v-show="!isLoading" class="page-content">
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
    </Transition>
  </div>
</template>

<script setup>
import { computed } from "vue";
import StickyHeader from "@/components/sections/StickyHeader.vue";
import BenefitsSection from "@/components/sections/BenefitsSection.vue";
import { useLanguageStore, useContentStore } from "@/stores";
import { useVideoPreloader } from "@/composables/useVideoPreloader.js";

const languageStore = useLanguageStore();
const contentStore = useContentStore();
const { isLoading, loadingProgress, videosToLoad, loadedVideos } =
  useVideoPreloader();

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

.page-content {
  @apply w-full;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
