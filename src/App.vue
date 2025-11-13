<template>
  <div id="app" class="min-h-screen">
    <!-- Sticky Header -->
    <StickyHeader
      :slogan="mockData.header.slogan"
      :navigation-items="mockData.header.navigationItems"
      :languages="mockData.header.languages"
      :current-language="mockData.header.currentLanguage"
      :scrolled="isScrolled"
      @cta-click="handleCtaClick"
      @nav-click="handleNavClick"
      @language-change="handleLanguageChange"
      :theme="headerTheme"
      :button-text="mockData.hero.buttonText"
    />

    <!-- Hero секция -->
    <HeroSection
      ref="heroSectionRef"
      :title="mockData.hero.title"
      :subtitle="mockData.hero.subtitle"
      :highlight-text="mockData.hero.highlightText"
      :highlight-avatars="mockData.hero.highlightAvatars"
      :button-text="mockData.hero.buttonText"
      :stats="mockData.hero.stats"
      :gallery="isMobile ? mockData.hero.galleryMobile : mockData.hero.gallery"
      @cta-click="handleCtaClick"
      class="pt-[128px] md:pt-[160px] lg:pt-[192px] xl:pb-0"
    />

    <!-- Tools (Dark) -->
    <ToolsSection
      ref="toolsSectionRef"
      :title="mockData.tools.title"
      :content="mockData.tools.content"
      :items="mockData.tools.items"

    />

    <!-- Cases Секция -->
    <CasesSection
      ref="casesSectionRef"
      :title="mockData.cases.title"
      :subtitle="mockData.cases.subtitle"
      :cases="mockData.cases.items"
    />

    <!-- How We Work Секция -->
    <HowWeWorkSection
      ref="howWeWorkSectionRef"
      :title="mockData.howWeWork.title"
      :items="mockData.howWeWork.items"
    />

    <!-- Expertise Секция -->
    <ExpertiseSection
    ref="expertiseSectionRef"
    :title="mockData.expertise.title"
    :subtitle="mockData.expertise.subtitle"
    :cards="mockData.expertise.items"
    />
    
    <!-- Comparison Секция -->
    <ComparisonSection
      ref="comparisonSectionRef"
      :title="mockData.comparison.title"
      :attributes="mockData.comparison.attributes"
      :columns="mockData.comparison.columns"
    />
    
    <!-- Opportunities Секция -->
    <OpportunitiesSection
      ref="opportunitiesSectionRef"
      :title="mockData.opportunities.title"
      :subtitle="mockData.opportunities.subtitle"
      :opportunities="mockData.opportunities.items"
      :footer-text1="mockData.opportunities.footerText1"
      :footer-text2="mockData.opportunities.footerText2"
      :button-text="mockData.opportunities.buttonText"
      @figma-click="handleFigmaClick"
    />

    <!-- Reviews Секция -->
    <ReviewsSection
      ref="reviewsSectionRef"
      :title="mockData.reviews.title"
      :subtitle="mockData.reviews.subtitle"
      :reviews="mockData.reviews.items"
    />

    <!-- FAQ Секция -->
    <FaqSection
      ref="faqSectionRef"
      :title="mockData.faq.title"
      :faq-items="mockData.faq.items"
    />

    <!-- Benefits Секция -->
    <BenefitsSection
      ref="benefitsSectionRef"
      :title="mockData.benefits.title"
      :benefits="mockData.benefits.items"
      :cta-text="mockData.benefits.ctaText"
      :cta-button-text="mockData.benefits.ctaButtonText"
      @cta-click="handleCtaClick"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqSection from "./components/sections/FaqSection.vue";
import HeroSection from "./components/sections/HeroSection.vue";
import HowWeWorkSection from "./components/sections/HowWeWorkSection.vue";
import ExpertiseSection from "./components/sections/ExpertiseSection.vue";
import CasesSection from "./components/sections/CasesSection.vue";
import OpportunitiesSection from "./components/sections/OpportunitiesSection.vue";
import ReviewsSection from "./components/sections/ReviewsSection.vue";
import BenefitsSection from "./components/sections/BenefitsSection.vue";
import ToolsSection from "./components/sections/ToolsSection.vue";
import ComparisonSection from "./components/sections/ComparisonSection.vue";
import StickyHeader from "./components/sections/StickyHeader.vue";

import { useBreakpoints } from "./composables/useBreakpoints.js";
import { useSectionThemeTracking } from "./composables/useSectionThemeTracking.js";
import { useMediaPaths } from "./composables/useMediaPaths.js";

import dataRu from "./data.ru.json";
import dataEn from "./data.en.json";

const { isMobile } = useBreakpoints();

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Функция для загрузки данных в зависимости от языка
const loadDataByLanguage = (lang) => {
  return lang === "en" ? dataEn : dataRu;
};

// Инициализируем данные с русским языком по умолчанию
const initialData = loadDataByLanguage("ru");
const mockData = ref(useMediaPaths(initialData));

// Текущий язык (берем из данных)
const currentLanguage = ref(mockData.value.header.currentLanguage);

// Функция для обновления данных при смене языка
const updateDataByLanguage = (lang) => {
  const newData = loadDataByLanguage(lang);
  const processedData = useMediaPaths(newData);
  // Обновляем все свойства mockData, используя Object.assign для правильной работы с реактивностью
  Object.assign(mockData.value, processedData);
};

const handleCtaClick = () => {
  window.open("http://t.me/meisdigital", "_blank");
};


const handleFigmaClick = () => {
  window.open(
    "https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo",
    "_blank"
  );
};

// Refs для секций
const heroSectionRef = ref(null);
const toolsSectionRef = ref(null);
const casesSectionRef = ref(null);
const howWeWorkSectionRef = ref(null);
const comparisonSectionRef = ref(null);
const expertiseSectionRef = ref(null);
const opportunitiesSectionRef = ref(null);
const reviewsSectionRef = ref(null);
const faqSectionRef = ref(null);
const benefitsSectionRef = ref(null);

// Используем композбл для отслеживания тем секций
const { isScrolled, headerTheme } = useSectionThemeTracking({
  heroSectionRef,
  toolsSectionRef,
  casesSectionRef,
  howWeWorkSectionRef,
  comparisonSectionRef,
  expertiseSectionRef,
  opportunitiesSectionRef,
  reviewsSectionRef,
  faqSectionRef,
  benefitsSectionRef,
});

const handleNavClick = (item) => {
  console.log("Nav clicked:", item);
};

const handleLanguageChange = (code) => {
  console.log("Language changed to:", code);
  currentLanguage.value = code;
  updateDataByLanguage(code);
};
</script>
