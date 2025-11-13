<template>
  <BaseContainer :as="'section'" bg="black">
    <div class="grid gap-10 md:gap-20 xl:gap-0 xl:gap-x-20 xl:grid-cols-2 xl:items-start">
      <!-- Текст и аватары -->
      <div class="flex w-full flex-col gap-8">
        <BaseHeading :level="gtXl ? 3 : 5" :as="'h1'" class="text-white-100">
          <span class="block">{{ title }}</span>
          <span class="block">{{ subtitle }}</span>
        </BaseHeading>

        <div class="flex flex-row gap-4 sm:flex-row">
          <AvatarStack :avatars="highlightAvatars" />

          <BaseText :as="'p'" size="p2" class="text-black-70 flex items-center">
            {{ highlightText }}
          </BaseText>
        </div>

        <BaseButton variant="primary" size="md" class="w-max" @click="$emit('cta-click')">
          {{ buttonText }}
        </BaseButton>
        <HeroStats :stats="stats" v-if="gtXl" class="mt-20"/>
      </div>


      <!-- Галерея -->
      <GalleryPlaceholder :items="galleryItems" />

      <!-- Статистика -->
      <HeroStats :stats="stats" v-if="!gtXl"/>
    </div>
  </BaseContainer>
</template>

<script setup>
import HeroStats from '../ui/HeroStats.vue'
import { computed } from 'vue'
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '../base'
import GalleryPlaceholder from '../ui/GalleryPlaceholder.vue'
import AvatarStack from '../ui/AvatarStack.vue'
import { useBreakpoints } from '../../composables/useBreakpoints.js'

const { gtXl } = useBreakpoints()

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  highlightText: {
    type: String,
    default: ''
  },
  highlightAvatars: {
    type: Array,
    default: () => [{}, {}, {}]
  },
  buttonText: {
    type: String,
    default: ''
  },
  stats: {
    type: Array,
    default: () => []
  },
  gallery: {
    type: Array,
    default: () => [{}, {}, {}]
  }
})

// Передаем все элементы галереи - карусель сама управляет отображением
const galleryItems = computed(() => props.gallery)

defineEmits(['cta-click'])
</script>


