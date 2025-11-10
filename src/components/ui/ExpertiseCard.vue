<template>
  <div class="bg-white-100 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full">
    <!-- Верхняя часть -->
    <div class="flex flex-col gap-2 md:gap-4 mb-4 md:mb-6">
      <BaseText 
        :as="gtMd ? 'h3' : 'h4'" 
        :size="gtMd ? 'h5' : 'p1'" 
        class="text-black-90"
      >
        {{ title }}
      </BaseText>

      <BaseText 
        :as="'p'" 
        size="p2" 
        class="text-black-50"
      >
        {{ description }}
      </BaseText>
    </div>

    <!-- Список с чекмарками -->
    <div v-if="items && items.length" class="flex flex-col">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="flex gap-4 items-center py-1 md:py-2"
      >
        <!-- Иконка чекмарка -->
        <div class="w-4 h-4 shrink-0">
          <img 
            :src="checkmarkIcon" 
            alt="" 
            class="w-full h-full object-contain" 
          />
        </div>
        
        <BaseText 
          :as="'p'" 
          size="p2" 
          class="text-black-50 flex-1"
        >
          {{ item }}
        </BaseText>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseText } from '../base'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtMd } = useBreakpoints()

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  checkmarkIcon: {
    type: String,
    default: 'https://www.figma.com/api/mcp/asset/3440a596-7c9c-49d6-b559-c97791eaf2e2'
  }
})
</script>

