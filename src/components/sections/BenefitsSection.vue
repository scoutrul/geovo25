<template>
  <BaseContainer :as="'section'" :max-width="'1052px'" :bg="'bg-black-90'" class="relative">
    <DecorativeLine :pin-count="0" class="hidden lg:block !absolute top-0 left-1/2 transform -translate-x-1/2"
      :style="{ top: gtXl ? '314px' : ltLg ? '405px' : '282px' }" />

    <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start w-full">

      <div class="flex flex-col items-start w-full sm:flex-1">
        <!-- Заголовок секции -->
        <BaseHeading :level="4" :as="'h2'"
          class="w-full text-white-90 text-[46px] leading-[1.2] sm:text-[64px] sm:leading-none mb-[90px]"
          :style="{ maxWidth: ltXl ? '430px' : 'inherit' }">
          {{ title }}
        </BaseHeading>

        <DecorativeLine :pin-count="benefits.length + 1" :hide-line="gtLg" class="hidden sm:block" />

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full">
          <BenefitCard v-for="(benefit, index) in benefits" :key="index" :text="benefit.text" />
        </div>
      </div>

      <div class="flex flex-col gap-6 items-start w-full sm:w-[300px] xl:w-[max-content] sm:py-4 sm:self-stretch">
        <BaseText size="p3" class="text-black-50">
          {{ ctaText }}
        </BaseText>

        <BaseButton variant="primary" size="md" @click="handleCtaClick">
          {{ ctaButtonText }}
        </BaseButton>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '../base'
import BenefitCard from '../ui/BenefitCard.vue'
import DecorativeLine from '../ui/DecorativeLine.vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtLg, gtXl, ltXl, ltLg } = useBreakpoints()

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
