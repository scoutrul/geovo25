<template>
  <BaseContainer :as="'section'" :bg="'bg-black-90'">
    <div class="grid gap-10 md:gap-20 xl:grid-cols-2 xl:items-start">
      <!-- Текст и аватары -->
      <div class="flex w-full flex-col gap-8 xl:max-w-[720px]">
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
      </div>

      <!-- Галерея -->
      <div class="flex flex-col gap-8 xl:row-span-2">
        <GalleryPlaceholder :items="galleryItems" />
      </div>

      <!-- Статистика -->
      <HeroStats :stats="stats" />
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

const galleryItems = computed(() => (gtXl.value ? props.gallery.slice(0, 3) : props.gallery.slice(0, 1)))

defineEmits(['cta-click'])
</script>


