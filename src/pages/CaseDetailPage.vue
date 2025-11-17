<template>
  <div class="case-detail-page bg-black-90">
    <!-- Sticky Header -->
    <StickyHeader
      :slogan="'Растем вместе'"
      :navigation-items="['Смотреть кейсы', 'Скачать CV']"
      :languages="[
        { code: 'en', label: 'English' },
        { code: 'ru', label: 'Русский' },
      ]"
      :current-language="'ru'"
      :scrolled="isScrolled"
      @cta-click="handleCtaClick"
      @nav-click="handleNavClick"
      theme="light"
      :button-text="'Познакомиться'"
    />

    <main class="min-h-screen pt-[96px]" role="main">
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
        :title="'Кейсы'"
        :subtitle="'Некоторые из моих историй, которые точно не оставят равнодушным'"
        :cases="allCases"
        :active-case="slug"
      />

      <!-- Benefits Section (Footer) -->
      <BenefitsSection
        :title="'Что нас ждет впереди'"
        :benefits="benefits"
        :cta-text="'Готовы перейти на новый уровень?'"
        :cta-button-text="'Познакомиться'"
        @cta-click="handleCtaClick"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import StickyHeader from "../components/sections/StickyHeader.vue";
import CaseHero from "../components/sections/CaseHero.vue";
import CaseOverview from "../components/sections/CaseOverview.vue";
import CaseBody from "../components/sections/CaseBody.vue";
import CasesSection from "../components/sections/CasesSection.vue";
import BenefitsSection from "../components/sections/BenefitsSection.vue";

const route = useRoute();
const slug = computed(() => route.params.slug);
const isScrolled = ref(false);

// Данные кейса AG1
const caseData = ref({
  id: "ag1",
  slug: "ag1",
  hero: {
    title: "AG1: как повысить средний чек в Health Nutririon по подписке",
    stats: [
      { value: "+18.2%", description: "к среднему чеку на повторную покупку" },
      { value: "+6.2%", description: "LTV" },
    ],
  },
  meta: {
    items: [
      { value: "Athletic Greens", label: "партнер" },
      { value: "Портленд, США", label: "локация" },
      { value: "Senior Product Designer, UX/UI", label: "роли" },
      {
        value:
          "Обновление бренда и веб-сайта, конструктор рекламных лендингов, личный кабинет на Shopify, CRM, админка для управления зказами, 3 дизайн-системы",
        label: "что я сделал",
      },
      {
        value:
          "Shopify, Figma, Design systems, Autolayouts, Tokens, Variables, iOS guidelines, Animations, A/B testing, Edge cases",
        label: "стек",
      },
    ],
  },
  overview: {
    title: "Продукт",
    sections: [
      {
        text: "AG1 — это ежедневный комплекс нутриентов в формате подписки. Человек раз в месяц получает набор, который закрывает базовые потребности в витаминах, минералах и адаптогенах. Никаких сложных схем: один продукт, простой ритуал и стабильный результат",
      },
      {
        text: "Подписка — сердце бизнеса. Чтобы она работала лучше, важно удобно изменять заказ, настройки подписки, контролировать поставки и понимать выгоду. Моя задача — упростить эти процессы, сделать воронку и интерфейс эффективным, а вместе с этим повысить средний чек и LTV",
      },
    ],
  },
  body: {
    sections: [
      {
        title: "Проблема",
        blocks: [
          {
            type: "text-image",
            text: `AG1 рос, но столкнулся с типичной проблемой подписочных сервисов: пользователи редко меняли план, не докупали дополнительные продукты и почти не взаимодействовали с личным кабинетом.

Причины были простые: нужные функции были глубоко спрятаны, выгоды между планами были неочевидны, а интерфейс не помогал принять решение. В итоге средний чек за повторную покупку оставался заметно ниже ожидаемого.`,
            image: "",
          },
        ],
      },
      {
        title: "Задача",
        blocks: [
          {
            type: "text",
            text: `Основные задачи, которые я взял на себя:
Повысить средний чек повторной покупки (цель — +18.2%).
Увеличить LTV (цель — +6.2%).
Упростить путь управления подпиской.
Сделать всё это аккуратно, без агрессивного давления на пользователя.`,
          },
        ],
      },
      {
        title: "Действие",
        blocks: [
          {
            type: "subsection",
            subtitle: "Разобрался, как люди ведут себя в продукте",
            text: "Проанализировал клики, скроллы, сценарии. Выяснил, где пользователи тормозят, что не находят и какие опции вообще игнорируют.",
            image: "",
          },
          {
            type: "subsection",
            subtitle: "Перестроил структуру страницы подписки",
            text: `Сделал варианты плана и доп. товары заметнее. Подсветил экономию и логику выбора.
Сократил количество шагов, сделал процесс визуально понятнее.`,
            image: "",
          },
          {
            type: "subsection",
            subtitle: "Добавил мягкий и честный upsell",
            text: `Не «купи ещё!», а спокойные подсказки:
— покажи выгоду при выборе 2 пачек вместо 1;
— предложи travel-packs как доп. продукт;
— объясни разницу между вариантами.
Подсказки появились только там, где они реально помогали пользователю принять решение.`,
            image: "",
          },
          {
            type: "subsection",
            subtitle: "Обновил личный кабинет и админку",
            text: `Упростил сценарии изменения даты доставки, количества упаковок, состава заказа.
Сделал карточки продуктов и модальные окна более понятными.`,
            image: "",
          },
          {
            type: "subsection",
            subtitle: "Протестировал гипотезы",
            text: "Запустили A/B-тесты, собрали данные, доработали текстовые подсказки, кнопки и визуальные акценты.",
          },
        ],
      },
      {
        title: "Результат",
        blocks: [
          {
            type: "text",
            text: `+18.2% к среднему чеку на повторной покупке.
+6.2% к LTV благодаря улучшенной работе подписки.
Люди стали активнее менять план и добавлять продукты.
Стало меньше вопросов в поддержку — интерфейс стал проще и понятнее.
Личный кабинет ожил: активность выросла примерно в 1.7 раза.`,
          },
          {
            type: "testimonial",
            quote: "У нас теперь просто потрясающая дизайн-система",
            author: "Ник Боус, дизайн-директор AG1",
          },
        ],
      },
    ],
  },
  nextCase: {
    slug: "adguard-wallet",
    title: "AdGuard Wallet",
  },
});

// Список всех кейсов
const allCases = ref([
  {
    slug: "ag1",
    title: "AG1",
    description: "Раскрою секрет успеха в Health Nutririon по подписке",
    image: "/assets/images/case-bg-1-05.jpg",
  },
  {
    slug: "adguard-wallet",
    title: "AdGuard Wallet",
    description:
      "Как защитить свои криптоактивы c помощью передовых подходов в Fintech",
    image: "",
  },
  {
    slug: "4real",
    title: "4Real",
    description: "iGaming, который действительно вовлекает",
    image: "/assets/images/case-bg-3-05.jpg",
  },
  {
    slug: "legaline",
    title: "Legaline",
    description: "eCommerce площадка в сфере Legal Law",
    image: "",
  },
]);

const benefits = ref([
  { text: "Запустим продукт за 1–3 месяца без остановки текущей работы" },
  { text: "Создадим с нуля или переработаем интерфейсы с улучшением метрик" },
  {
    text: "Создадим гибкую дизайн-систему по всем современным стандартам для ускорения разработки",
  },
  { text: "Создадим гайды и спеки для лучшего масштабирования" },
]);

const handleCtaClick = () => {
  window.open("http://t.me/meisdigital", "_blank");
};

const handleNavClick = (item) => {
  console.log("Nav clicked:", item);
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 50;
  });
});
</script>

<style scoped>
.case-detail-page {
  @apply min-h-screen;
}
</style>
