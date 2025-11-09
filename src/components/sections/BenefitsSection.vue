<template>
  <BaseContainer 
    :as="'section'"
    :max-width="'full'"
    :bg="'bg-black-90'"
  >
    <!-- Мобильная: вертикальная раскладка, Планшет+Десктоп: горизонтальная с CTA справа -->
    <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start w-full">
      <!-- Основной контент (заголовок + карточки) -->
      <div class="flex flex-col gap-16 sm:gap-[90px] items-start w-full sm:flex-1">
        <!-- Заголовок секции -->
        <BaseHeading 
          :level="4" 
          :as="'h2'"
          class="w-full text-white-90 text-[46px] leading-[1.2] sm:text-[64px] sm:leading-none"
        >
          {{ title }}
        </BaseHeading>

        <!-- Контейнер с карточками преимуществ -->
        <!-- Мобильная: flex-wrap 2 колонки, Планшет+: 4 колонки flex -->
        <div class="flex flex-wrap sm:flex-nowrap gap-8 w-full">
          <BenefitCard
            v-for="(benefit, index) in benefits"
            :key="index"
            :text="benefit.text"
            class="w-[140px] sm:w-full sm:flex-1 sm:pt-16"
          />
        </div>
      </div>

      <!-- CTA блок -->
      <!-- Мобильная: внизу на всю ширину, Планшет+: справа фиксированная ширина -->
      <div class="flex flex-col gap-6 items-start w-full sm:w-[300px] xl:w-[max-content] sm:py-4 sm:self-stretch">
        <BaseText 
          size="p3" 
          class="text-black-50"
        >
          {{ ctaText }}
        </BaseText>
        
        <BaseButton 
          variant="primary" 
          size="md"
          @click="handleCtaClick"
        >
          {{ ctaButtonText }}
        </BaseButton>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '../base'
import BenefitCard from '../ui/BenefitCard.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  benefits: {
    type: Array,
    required: true
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaButtonText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['cta-click'])

const handleCtaClick = () => {
  emit('cta-click')
  console.log('CTA кнопка нажата')
}
</script>

