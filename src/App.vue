<template>
  <div id="app" class="min-h-screen bg-black-90">
    <BenefitsSection
      :title="sectionData.title"
      :benefits="sectionData.benefits"
      :cta-text="sectionData.ctaText"
      :cta-button-text="sectionData.ctaButtonText"
      @cta-click="handleCtaClick"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BenefitsSection from './components/sections/BenefitsSection.vue'

// Данные секции из макета
const sectionData = reactive({
  title: 'Что нас ждет впереди',
  benefits: [
    {
      text: 'Запустим продукт за 1–3 месяца без остановки текущей работы'
    },
    {
      text: 'Создадим с нуля или переработаем интерфейсы с улучшением метрик'
    },
    {
      text: 'Создадим гибкую дизайн-систему по всем современным стандартам для ускорения разработки'
    },
    {
      text: 'Создадим гайды и спеки для лучшего масштабирования'
    }
  ],
  ctaText: 'Готовы перейти на новый уровень?',
  ctaButtonText: 'Познакомиться'
})

const handleCtaClick = () => {
  console.log('CTA clicked - можно открыть модальное окно или перейти на другую страницу')
  // Здесь можно добавить логику для обработки клика
}
</script>

