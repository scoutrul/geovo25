<template>
  <div class="flex flex-col gap-6 w-full">
    <BaseText 
      :as="'p'" 
      size="p2" 
      color="white-100"
      class="whitespace-pre-wrap"
    >
      {{ text }}
    </BaseText>
  </div>
</template>

<script setup>
import { BaseText } from '../base'

defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

