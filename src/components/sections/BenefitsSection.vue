<template>
  <section class="bg-black-90 w-full py-16">
    <BaseContainer :padding="true" :max-width="'full'">
      <div class="flex flex-col gap-16 items-start w-full">
        <!-- Заголовок секции -->
        <BaseHeading 
          :level="4" 
          :as="'h2'"
          color="white-90"
          class="w-full"
        >
          {{ title }}
        </BaseHeading>

        <!-- Контейнер с карточками преимуществ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          <BenefitCard
            v-for="(benefit, index) in benefits"
            :key="index"
            :text="benefit.text"
          />
        </div>

        <!-- CTA блок -->
        <div class="flex flex-col gap-6 items-start w-full">
          <BaseText 
            size="p3" 
            color="black-50"
            weight="medium"
            class="tracking-tight"
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
  </section>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '../base'
import BenefitCard from '../ui/BenefitCard.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Что нас ждет впереди'
  },
  benefits: {
    type: Array,
    required: true
  },
  ctaText: {
    type: String,
    default: 'Готовы перейти на новый уровень?'
  },
  ctaButtonText: {
    type: String,
    default: 'Познакомиться'
  }
})

const emit = defineEmits(['cta-click'])

const handleCtaClick = () => {
  emit('cta-click')
  console.log('CTA кнопка нажата')
}
</script>

