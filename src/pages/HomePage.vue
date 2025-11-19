<template>
  <!-- Прелоадер видео -->
  <Transition name="fade" mode="out-in">
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black-90 z-50 flex items-center justify-center"
    >
      <div class="flex flex-col items-center gap-6">
        <!-- Логотип с анимацией GSAP -->
        <LoaderLogo @animation-cycle-complete="handleLogoAnimationCycleComplete" />
      </div>
    </div>
  </Transition>

  <!-- Основной контент страницы -->
  <PageLayout
    v-show="!isLoading"
    :header-theme="headerTheme"
    :footer-props="{
      id: sectionAnchors.benefits.section,
      'aria-labelledby': sectionAnchors.benefits.heading,
      headingId: sectionAnchors.benefits.heading,
    }"
    @header-nav-case-scroll="handleNavCaseScroll"
  >
    <!-- Hero секция -->
    <HeroSection
      ref="heroSectionRef"
      :id="sectionAnchors.hero.section"
      :aria-labelledby="sectionAnchors.hero.heading"
      :heading-id="sectionAnchors.hero.heading"
      :title="content.hero.title"
      :subtitle="content.hero.subtitle"
      :highlight-text="content.hero.highlightText"
      :highlight-avatars="content.hero.highlightAvatars"
      :button-text="content.hero.buttonText"
      :stats="content.hero.stats"
      :gallery="isMobile ? content.hero.galleryMobile : content.hero.gallery"
      class="pt-[128px] md:pt-[160px] lg:pt-[192px] xl:pb-0"
    />

    <!-- Tools (Dark) -->
    <ToolsSection
      ref="toolsSectionRef"
      :id="sectionAnchors.tools.section"
      :aria-labelledby="sectionAnchors.tools.heading"
      :heading-id="sectionAnchors.tools.heading"
      :title="content.tools.title"
      :content="content.tools.content"
      :items="content.tools.items"
    />

    <!-- Cases Секция -->
    <LazySection
      :component="LazyCasesSection"
      ref="casesSectionRef"
      :id="sectionAnchors.cases.section"
      :aria-labelledby="sectionAnchors.cases.heading"
      :heading-id="sectionAnchors.cases.heading"
      :title="content.cases.title"
      :subtitle="content.cases.subtitle"
      :cases="content.cases.items"
    />

    <!-- How We Work Секция (Lazy) -->
    <LazySection
      :component="LazyHowWeWorkSection"
      :id="sectionAnchors.howWeWork.section"
      :aria-labelledby="sectionAnchors.howWeWork.heading"
      :heading-id="sectionAnchors.howWeWork.heading"
      :title="content.howWeWork.title"
      :items="content.howWeWork.items"
    />

    <!-- Expertise Секция (Lazy) -->
    <LazySection
      :component="LazyExpertiseSection"
      :id="sectionAnchors.expertise.section"
      :aria-labelledby="sectionAnchors.expertise.heading"
      :heading-id="sectionAnchors.expertise.heading"
      :title="content.expertise.title"
      :subtitle="content.expertise.subtitle"
      :cards="content.expertise.items"
    />

    <!-- Comparison Секция (Lazy) -->
    <LazySection
      :component="LazyComparisonSection"
      :id="sectionAnchors.comparison.section"
      :aria-labelledby="sectionAnchors.comparison.heading"
      :heading-id="sectionAnchors.comparison.heading"
      :title="content.comparison.title"
      :attributes="content.comparison.attributes"
      :columns="content.comparison.columns"
    />

    <!-- Opportunities Секция (Lazy) -->
    <LazySection
      :component="LazyOpportunitiesSection"
      :id="sectionAnchors.opportunities.section"
      :aria-labelledby="sectionAnchors.opportunities.heading"
      :heading-id="sectionAnchors.opportunities.heading"
      :title="content.opportunities.title"
      :subtitle="content.opportunities.subtitle"
      :opportunities="content.opportunities.items"
      :footer-text1="content.opportunities.footerText1"
      :footer-text2="content.opportunities.footerText2"
      :button-text="content.opportunities.buttonText"
    />

    <!-- Reviews Секция (Lazy) -->
    <LazySection
      :component="LazyReviewsSection"
      :id="sectionAnchors.reviews.section"
      :aria-labelledby="sectionAnchors.reviews.heading"
      :heading-id="sectionAnchors.reviews.heading"
      :title="content.reviews.title"
      :subtitle="content.reviews.subtitle"
      :reviews="content.reviews.items"
    />

    <!-- FAQ Секция (Lazy) -->
    <LazySection
      :component="LazyFaqSection"
      :id="sectionAnchors.faq.section"
      :aria-labelledby="sectionAnchors.faq.heading"
      :heading-id="sectionAnchors.faq.heading"
      :title="content.faq.title"
      :faq-items="content.faq.items"
    />
  </PageLayout>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import PageLayout from "@/layouts/PageLayout.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import ToolsSection from "@/components/sections/ToolsSection.vue";
import LazySection from "@/components/LazySection.vue";

// Ленивая загрузка секций ниже fold
const LazyHowWeWorkSection = defineAsyncComponent(() =>
  import("@/components/sections/HowWeWorkSection.vue")
);
const LazyExpertiseSection = defineAsyncComponent(() =>
  import("@/components/sections/ExpertiseSection.vue")
);
const LazyComparisonSection = defineAsyncComponent(() =>
  import("@/components/sections/ComparisonSection.vue")
);
const LazyOpportunitiesSection = defineAsyncComponent(() =>
  import("@/components/sections/OpportunitiesSection.vue")
);
const LazyReviewsSection = defineAsyncComponent(() =>
  import("@/components/sections/ReviewsSection.vue")
);
const LazyFaqSection = defineAsyncComponent(() =>
  import("@/components/sections/FaqSection.vue")
);

const LazyCasesSection = defineAsyncComponent(() =>
  import("@/components/sections/CasesSection.vue")
);

import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useSectionThemeTracking } from "@/composables/useSectionThemeTracking.js";
import { useContentStore } from "@/stores";
import { useVideoPreloader } from "@/composables/useVideoPreloader.js";
import { useSmoothScroll } from "@/composables/useSmoothScroll.js";
import LoaderLogo from "@/components/ui/LoaderLogo.vue";

const { isMobile } = useBreakpoints();
const { scrollToElement } = useSmoothScroll();
const contentStore = useContentStore();
const { isLoading, logoAnimationCycleComplete } = useVideoPreloader();

// Обработчик завершения цикла анимации лоадера
const handleLogoAnimationCycleComplete = () => {
  logoAnimationCycleComplete();
};

// Получаем данные из store
const content = computed(() => contentStore.currentData);

const sectionAnchors = Object.freeze({
  hero: { section: "section-hero", heading: "section-hero-heading" },
  tools: { section: "section-tools", heading: "section-tools-heading" },
  cases: { section: "section-cases", heading: "section-cases-heading" },
  howWeWork: {
    section: "section-how-we-work",
    heading: "section-how-we-work-heading",
  },
  expertise: {
    section: "section-expertise",
    heading: "section-expertise-heading",
  },
  comparison: {
    section: "section-comparison",
    heading: "section-comparison-heading",
  },
  opportunities: {
    section: "section-opportunities",
    heading: "section-opportunities-heading",
  },
  reviews: { section: "section-reviews", heading: "section-reviews-heading" },
  faq: { section: "section-faq", heading: "section-faq-heading" },
  benefits: {
    section: "section-benefits",
    heading: "section-benefits-heading",
  },
});

// Refs для секций
const heroSectionRef = ref(null);
const toolsSectionRef = ref(null);
const casesSectionRef = ref(null);

// Используем композбл для отслеживания тем секций
const { headerTheme } = useSectionThemeTracking({
  heroSectionRef,
  toolsSectionRef,
  casesSectionRef,
});

// Обработка скролла к секции кейсов
const handleNavCaseScroll = () => {
  const element = document.getElementById(sectionAnchors.cases.section);
  scrollToElement(element);
};
</script>

<style scoped>
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
