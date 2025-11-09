<template>
  <section class="bg-black-90 w-full py-16">
    <BaseContainer :padding="true" :max-width="'full'">
      <div class="flex flex-col gap-16 items-start w-full">
        <!-- Заголовок секции -->
        <BaseHeading 
          :level="4" 
          :as="'h2'"
          class="w-full text-white-90"
        >
          {{ title }}
        </BaseHeading>

        <!-- Контейнер с карточками преимуществ -->
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-8 w-full">
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
  </section>
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

