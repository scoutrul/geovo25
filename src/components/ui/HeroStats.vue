<template>
    <div class="relative md:overflow-hidden" :style="{ maxWidth: 'calc(100vw - 32px)' }">
        <div class="stats-gradient"></div>
        <AdaptiveGrid class="flex sm:grid grid-flow-col !grid-cols-4 auto-cols-[160px] xl:auto-cols-[auto] lg:min-w-[auto] lg:px-0 lg:mx-0 lg:overflow-hidden">
            <div v-for="(stat, index) in stats" :key="index" class="flex flex-col gap-4 min-w-[160px] lg:min-w-[auto]">
                <BaseText :as="'p'" size="h5" class="text-white-100">
                    {{ stat.value }}
                </BaseText>
                <BaseText :as="'p'" size="p2" class="text-black-70">
                    {{ stat.description }}
                </BaseText>
            </div>
        </AdaptiveGrid>
    </div>
</template>

<script setup>
import { BaseText, AdaptiveGrid } from "../base";

defineProps({
    stats: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped>
.stats-gradient {
    height: 100%;
    position: absolute;
    left: -16px;
    right: -16px;
    z-index: 1;
    pointer-events: none;
    background: rgba(255, 255, 255, 0);
    background: radial-gradient(circle, rgba(255, 255, 255, 0) 73%, rgb(22 22 22) 97%);
}
</style>
