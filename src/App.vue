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
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
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
import data from "./data.json";

const { isMobile } = useBreakpoints();

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Функция для преобразования путей к медиа
const resolveAssetPath = (path) => {
  if (!path) return path;
  // Если путь уже является URL или начинается с http/https, возвращаем как есть
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Используем new URL для правильной обработки путей в Vite
  try {
    return new URL(path, import.meta.url).href;
  } catch {
    return path;
  }
};

// Преобразуем пути к медиа в данных
const processMediaPaths = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => processMediaPaths(item));
  } else if (obj && typeof obj === 'object') {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'src' || key === 'icon' || key === 'image') {
        processed[key] = resolveAssetPath(value);
      } else {
        processed[key] = processMediaPaths(value);
      }
    }
    return processed;
  }
  return obj;
};

// Данные для всех секций
const mockData = reactive(processMediaPaths(data));

const handleCtaClick = () => {
  window.open("http://t.me/meisdigital", "_blank");
};


const handleFigmaClick = () => {
  window.open(
    "https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo",
    "_blank"
  );
};

// Состояние скролла для хедера
const isScrolled = ref(false);

// Тема хедера (по умолчанию светлая, так как первая секция Hero темная)
const headerTheme = ref("dark");

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

// Определение темы секции (темная = 'dark', светлая = 'light')
// Header должен быть противоположным теме секции
const sectionThemes = {
  hero: "dark", // bg-black-90 -> Header должен быть light
  tools: "dark", // bg-black-90 -> Header должен быть light
  cases: "light", // bg-white-90 -> Header должен быть dark
  howWeWork: "light", // bg-white-90 -> Header должен быть dark
  comparison: "light", // bg-white-90 -> Header должен быть dark
  expertise: "light", // bg-white-90 -> Header должен быть dark
  opportunities: "light", // bg-white-90 -> Header должен быть dark
  reviews: "light", // bg-white-90 -> Header должен быть dark
  faq: "light", // bg-white-90 -> Header должен быть dark
  benefits: "dark", // bg-black-90 -> Header должен быть light
};

// Отслеживание скролла
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Инициализация ScrollTrigger для отслеживания секций
const initSectionThemeTracking = () => {
  const sections = [
    { ref: heroSectionRef, key: "hero" },
    { ref: toolsSectionRef, key: "tools" },
    { ref: casesSectionRef, key: "cases" },
    { ref: howWeWorkSectionRef, key: "howWeWork" },
    { ref: comparisonSectionRef, key: "comparison" },
    { ref: expertiseSectionRef, key: "expertise" },
    { ref: opportunitiesSectionRef, key: "opportunities" },
    { ref: reviewsSectionRef, key: "reviews" },
    { ref: faqSectionRef, key: "faq" },
    { ref: benefitsSectionRef, key: "benefits" },
  ];

  sections.forEach(({ ref, key }) => {
    if (!ref.value) {
      console.warn(`Section ref for ${key} is not available`);
      return;
    }

    // Находим корневой элемент секции (BaseContainer)
    // В Vue 3 компонент имеет $el для корневого элемента
    const sectionElement = ref.value.$el;
    
    if (!sectionElement) {
      console.warn(`Section element for ${key} is not found`);
      return;
    }

    ScrollTrigger.create({
      trigger: sectionElement,
      start: "top top", // Когда верх секции касается верха экрана
      end: "bottom top", // Когда низ секции касается верха экрана
      onEnter: () => {
        // Секция входит в верх экрана
        const sectionTheme = sectionThemes[key];
        // Header должен быть противоположным теме секции
        headerTheme.value = sectionTheme === "dark" ? "dark" : "light";
      },
      onEnterBack: () => {
        // Скроллим назад, секция снова входит в верх экрана
        const sectionTheme = sectionThemes[key];
        headerTheme.value = sectionTheme === "dark" ? "dark" : "light";
      },
      onLeave: () => {
        // Секция покидает верх экрана (скроллим вниз)
        // Не меняем тему, так как следующая секция уже активирована
      },
      onLeaveBack: () => {
        // Секция покидает верх экрана (скроллим вверх)
        // Не меняем тему, так как предыдущая секция уже активирована
      },
    });
  });
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);

  // Ждем, пока все секции будут отрендерены
  // Используем двойной nextTick для гарантии, что все DOM элементы готовы
  await nextTick();
  await nextTick();

  // Инициализируем отслеживание тем секций
  initSectionThemeTracking();

  // Устанавливаем начальную тему на основе первой секции (Hero)
  // Hero темная, поэтому Header должен быть светлым
  headerTheme.value = sectionThemes.hero === "dark" ? "dark" : "light";

  // Обновляем ScrollTrigger после инициализации
  ScrollTrigger.refresh();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  // Очищаем все ScrollTrigger инстансы
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

const handleNavClick = (item) => {
  console.log("Nav clicked:", item);
};

const handleLanguageChange = (code) => {
  console.log("Language changed to:", code);
  mockData.header.currentLanguage = code;
};
</script>
