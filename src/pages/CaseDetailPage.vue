<template>
  <PageLayout
    @header-nav-case-scroll="handleNavCaseScroll"
  >
    <!-- Hero Section -->
    <CaseHero
      :title="caseData.hero.title"
      :stats="caseData.hero.stats"
      :meta-items="caseData.meta.items"
    />

    <!-- Overview Section -->
    <CaseOverview
      :title="caseData.overview.title"
      :sections="caseData.overview.sections"
    />

    <!-- Body Section -->
    <CaseBody
      :sections="caseData.body.sections"
      :meta-items="caseData.meta.items"
      :next-case="caseData.nextCase"
    />

    <!-- Cases Section -->
    <CasesSection
      id="cases-section"
      :title="casesContent.title"
      :subtitle="casesContent.subtitle"
      :cases="allCases"
    />
  </PageLayout>
</template>

<script setup>
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import PageLayout from "@/layouts/PageLayout.vue";
import CaseHero from "@/components/case/CaseHero.vue";
import CaseOverview from "@/components/case/CaseOverview.vue";
import CaseBody from "@/components/case/CaseBody.vue";
import CasesSection from "@/components/sections/CasesSection.vue";
import { useCasesStore, useContentStore } from "@/stores";

const route = useRoute();
const casesStore = useCasesStore();
const contentStore = useContentStore();

// Регистрируем плагин ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const slug = computed(() => route.params.slug);

// Получаем данные кейса из store
const caseData = computed(() => casesStore.getCaseBySlug(slug.value));

// Данные секции кейсов из контент стора
const casesContent = computed(() => contentStore.currentData?.cases || {});

// Получаем список всех кейсов из контента
const allCases = computed(() => casesContent.value.items || []);

// Функция для обновления title документа
const updateDocumentTitle = () => {
  if (caseData.value?.hero?.title) {
    document.title = caseData.value.hero.title;
  }
};

// Устанавливаем title при монтировании
onMounted(() => {
  updateDocumentTitle();
});

// Обновляем title при смене кейса
watch(
  () => slug.value,
  () => {
    updateDocumentTitle();
  }
);

// Обработка скролла к секции кейсов
const handleNavCaseScroll = () => {
  const element = document.getElementById('cases-section');
  if (element) {
    const headerOffset = 0; // Отступ для фиксированного хедера
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: offsetPosition, autoKill: true },
      ease: "power2.inOut"
    });
  }
};
</script>

<style scoped></style>
