<template>
  <div class="flex flex-col gap-6 w-full">
    <!-- Иконка -->
    <div v-if="icon" class="w-8 h-8 shrink-0">
      <img :src="icon" :alt="title" class="w-full h-full object-contain" />
    </div>

    <!-- Контент -->
    <div class="flex flex-col gap-2 w-full">
      <BaseText 
        :as="'h3'" 
        size="p1" 
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
  </div>
</template>

<script setup>
import { BaseText } from '../base'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

