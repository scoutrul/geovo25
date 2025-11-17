<template>
  <BaseCard variant="transparent" class="gap-6 w-full">
    <BaseText :as="'p'" size="p2" class="text-white-100 whitespace-pre-wrap">
      {{ text }}
    </BaseText>
  </BaseCard>
</template>

<script setup>
import { BaseCard, BaseText } from "../base";

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
