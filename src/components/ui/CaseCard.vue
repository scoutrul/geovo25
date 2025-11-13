<template>
  <BaseCard class="gap-4">
    <!-- Текстовый контейнер -->
    <div 
      class="flex flex-col gap-2 sm:gap-4 p-6 sm:p-8 h-[166px]"
    >
      <!-- Заголовок карточки: H5 на desktop, P1 regular на mobile -->
      <BaseText 
        v-if="!gtLg"
        :as="'h3'" 
        size="p1" 
        class="text-black-90"
      >
        {{ title }}
      </BaseText>
      <BaseHeading 
        v-else
        :level="5" 
        :as="'h3'"
        class="text-black-90"
      >
        {{ title }}
      </BaseHeading>
      
      <BaseText 
        :as="'p'" 
        size="p2" 
        class="text-black-50 min-h-[52px]"
      >
        {{ description }}
      </BaseText>
    </div>

    <!-- Контейнер изображения -->
    <div 
      class="flex-1 pl-6 sm:pl-8 overflow-hidden rounded-bl-2xl rounded-tl-2xl"
    >
      <div 
        class="bg-white-80 w-full h-full rounded-tl-2xl flex items-center justify-center"
      >
        <img 
          v-if="image"
          :src="image" 
          :alt="title"
          class="w-full h-full object-cover rounded-tl-2xl"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import { BaseCard, BaseHeading, BaseText } from '../base'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtLg } = useBreakpoints()

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
})
</script>

