<template>
  <BaseContainer
    as="header"
    :max-width="'full'"
    class="fixed top-0 z-50 w-full transition-all duration-200 !py-3 md:!py-6 overflow-visible"
    :class="headerClasses"
  >
    <div
      class="w-full backdrop-blur-[20px] rounded-lg md:rounded-xl transition-all duration-200 flex items-center justify-between md:justify-start gap-6 p-3 md:px-6 md:gap-10"
      :class="containerClasses"
    >
      <!-- Лого -->
      <div class="flex items-center shrink-0" :class="logoSizeClasses">
        <img
          :src="logoMark"
          alt="Logo"
          class="w-full h-full object-contain"
          :class="logoColorClass"
        />
      </div>

      <!-- Слоган (скрыт на мобильном и планшете) -->
      <div class="hidden sm:flex items-center gap-6 mr-auto">
        <p class="text-p2 whitespace-nowrap" :class="sloganColorClass">
          {{ slogan }}
        </p>
      </div>

      <!-- Навигация (скрыта на мобильном) -->
      <nav
        class="hidden md:flex xl:flex-1 xl:justify-center gap-6 mr-auto"
        :class="navClasses"
      >
        <a
          v-for="(item, index) in navigationItems"
          :key="index"
          href="#"
          class="text-p2 hover:text-primary transition-colors whitespace-nowrap"
          :class="navLinkColorClass"
          @click.prevent="$emit('nav-click', item)"
        >
          {{ item }}
        </a>
      </nav>

      <!-- Язык (скрыт на мобильном) -->
      <div class="hidden lg:block">
        <LanguageDropdown
          :theme="theme"
          :languages="languages"
          :model-value="currentLanguage"
          @update:model-value="handleLanguageChange"
        />
      </div>
      <!-- CTA -->
      <BaseButton variant="primary" size="md" @click="$emit('cta-click')">
        Познакомиться
      </BaseButton>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed } from "vue";
import BaseContainer from "../base/BaseContainer.vue";
import BaseButton from "../base/BaseButton.vue";
import LanguageDropdown from "../ui/LanguageDropdown.vue";
import logoMark from "../../assets/icons/logo-mark.svg";

const props = defineProps({
  slogan: {
    type: String,
    default: "",
  },
  navigationItems: {
    type: Array,
    default: () => [],
  },
  scrolled: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: "dark",
    validator: (value) => ["light", "dark"].includes(value),
  },
  languages: {
    type: Array,
    default: () => [],
  },
  currentLanguage: {
    type: String,
    default: "ru",
  },
});

const emit = defineEmits([
  "cta-click",
  "nav-click",
  "language-change",
]);

const isDark = computed(() => props.theme === "dark");

// Классы для контейнера
const containerClasses = computed(() => {
  return isDark.value ? "bg-black-90-alpha" : "bg-white-90-alpha";
});

// Классы для размера лого
const logoSizeClasses = computed(() => {
  return "h-[34px] w-[35px] md:h-[34px] md:w-[35px] lg:h-10 lg:w-[41px]";
});

// Классы для цвета лого (через фильтр)
const logoColorClass = computed(() => {
  return isDark.value
    ? "brightness-0 invert" // Белый лого для темной темы
    : "opacity-90 invert"; // Черный лого для светлой темы
});

// Классы для цвета слогана
const sloganColorClass = computed(() => {
  return isDark.value
    ? "text-black-70" // #cdcdcd для темной темы
    : "text-black-50"; // #5c5c5c для светлой темы
});

// Классы для навигации
const navClasses = computed(() => {
  return "lg:flex-1 lg:justify-end";
});

// Классы для ссылок навигации
const navLinkColorClass = computed(() => {
  return isDark.value
    ? "text-white-90" // #f6f6f5 для темной темы
    : "text-black-90"; // #161616 для светлой темы
});

// Обработчик для дропдауна языка
const handleLanguageChange = (code) => {
  emit("language-change", code);
};

// Классы для хедера
const headerClasses = computed(() => {
  return props.scrolled ? "shadow-sm" : "";
});
</script>
