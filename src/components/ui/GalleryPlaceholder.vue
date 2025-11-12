<template>
  <div 
    ref="carouselWrapperRef" 
    :key="bpChanged"
    :class="wrapperClass"
  >
    <div ref="carouselContainerRef" :class="containerClass">
      <!-- Дублируем элементы для бесконечной карусели -->
      <div 
        v-for="(item, index) in duplicatedItems" 
        :key="`carousel-item-${index}`" 
        class="carousel-item  rounded-[20px] overflow-hidden inset-0"
      >
        <div :class="aspectClass" />

        <img 
          v-if="item?.src && !isVideo(item)" 
          :src="item.src" 
          :alt="item?.alt || `gallery-image-${index}`"
          class="absolute inset-0 h-full w-full object-cover" 
        />

        <video 
          v-if="item?.src && isVideo(item)" 
          :src="item.src" 
          :alt="item?.alt || `gallery-video-${index}`"
          class="absolute inset-0 h-full w-full object-cover" 
          autoplay 
          loop 
          muted
          playsinline 
        />

        <div :class="['pointer-events-none absolute inset-0', gradientClass]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { gsap } from "gsap";
import { useBreakpoints } from "../../composables/useBreakpoints.js";

const { gtXl, bpChanged, deviceType } = useBreakpoints();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const carouselWrapperRef = ref(null);
const carouselContainerRef = ref(null);
let animation = null;
let currentStep = null;

// Дублируем элементы для бесконечной карусели (3 копии)
const duplicatedItems = computed(() => {
  return [...props.items, ...props.items, ...props.items];
});

// Классы для обертки
const wrapperClass = computed(() => {
  if (gtXl.value) {
    // Вертикальная карусель на десктопе - показываем 4 элемента
    return "overflow-hidden";
  } else {
    // Горизонтальная карусель на мобильном/планшете - показываем 1 элемент
    return "overflow-hidden";
  }
});

// Классы для контейнера
const containerClass = computed(() => {
  if (gtXl.value) {
    // Вертикальная карусель
    return "flex flex-col";
  } else {
    // Горизонтальная карусель
    return "flex flex-row";
  }
});

const aspectClass = computed(() => {
  switch (deviceType.value) {
    case "mobile":
      return "aspect-[3/4]";
    case "tablet":
      return "aspect-[16/9]";
    default:
      return "aspect-[16/9]";
  }
});

const gradientClass = computed(() => {
  if (gtXl.value) {
    // Вертикальная карусель - градиент снизу
    return "bg-gradient-to-b from-transparent via-black-90/60 to-black-90";
  } else {
    // Горизонтальная карусель - градиент справа
    switch (deviceType.value) {
      case "mobile":
        return "bg-gradient-to-r from-transparent via-black-90/20 to-black-90";
      case "tablet":
        return "bg-gradient-to-r from-transparent via-black-90/50 to-black-90";
      default:
        return "bg-gradient-to-r from-transparent via-black-90/60 to-black-90";
    }
  }
});

const isVideo = (item) => {
  if (!item?.src) return false;

  // Если явно указан тип
  if (item.type === "video") return true;
  if (item.type === "image") return false;

  // Определяем по расширению файла
  const src = String(item.src);
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  return videoExtensions.some((ext) => src.toLowerCase().includes(ext));
};

// Инициализация анимации карусели
const initCarousel = async () => {
  if (
    !carouselContainerRef.value ||
    !carouselWrapperRef.value ||
    props.items.length === 0
  ) {
    return;
  }

  // Убиваем предыдущие анимации, если есть
  if (animation) {
    animation.kill();
    animation = null;
  }
  if (currentStep) {
    currentStep.kill();
    currentStep = null;
  }

  await nextTick();

  const container = carouselContainerRef.value;
  const wrapper = carouselWrapperRef.value;
  const itemCount = props.items.length;
  const gap = gtXl.value ? 32 : 24; // gap-8 = 32px на десктопе, gap-6 = 24px на мобильном

  if (gtXl.value) {
    // Вертикальная карусель на десктопе - показываем 4 элемента
    const firstItem = container.children[0];
    if (!firstItem) return;

    // Вычисляем высоту одного элемента
    const itemWidth = wrapper.offsetWidth;
    const aspectRatio = 16 / 9;
    const itemHeight = itemWidth / aspectRatio;
    const itemSize = itemHeight + gap;
    const totalSize = itemSize * itemCount;

    // Высота видимой области = 4 элемента
    const visibleHeight = itemSize * 4 - gap; // 4 элемента минус один gap
    gsap.set(wrapper, { height: visibleHeight });

    // Устанавливаем начальную позицию (начинаем с первого элемента второй копии)
    // Смещаем так, чтобы показывались элементы с индекса itemCount (начало второй копии)
    gsap.set(container, { y: -totalSize });

    // Функция для одного цикла анимации
    const animateStep = () => {
      const currentY = gsap.getProperty(container, "y");
      const newY = currentY - itemSize;

      // Если дошли до конца второй копии, сбрасываем на начало второй копии (бесшовный переход)
      if (Math.abs(currentY) >= totalSize * 2) {
        gsap.set(container, { y: -totalSize });
        // Продолжаем анимацию
        currentStep = gsap.delayedCall(2, animateStep);
        return;
      }

      // Анимация: перемещаем на один элемент
      currentStep = gsap.to(container, {
        y: newY,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Пауза 2 секунды, затем следующий шаг
          currentStep = gsap.delayedCall(2, animateStep);
        },
      });
    };

    // Начинаем анимацию после небольшой задержки
    animation = gsap.delayedCall(0.1, animateStep);
  } else {
    // Горизонтальная карусель на мобильном/планшете - показываем 1 элемент
    const itemWidth = wrapper.offsetWidth;
    const itemSize = itemWidth + gap;
    const totalSize = itemSize * itemCount;

    // Устанавливаем ширину всех элементов равной ширине wrapper
    const items = container.children;
    for (let i = 0; i < items.length; i++) {
      gsap.set(items[i], { width: itemWidth });
    }

    // Устанавливаем начальную позицию (начинаем с первого элемента второй копии)
    gsap.set(container, { x: -totalSize });

    // Функция для одного цикла анимации
    const animateStep = () => {
      const currentX = gsap.getProperty(container, "x");
      const newX = currentX - itemSize;

      // Если дошли до конца второй копии, сбрасываем на начало второй копии (бесшовный переход)
      if (Math.abs(currentX) >= totalSize * 2) {
        gsap.set(container, { x: -totalSize });
        // Продолжаем анимацию
        currentStep = gsap.delayedCall(2, animateStep);
        return;
      }

      // Анимация: перемещаем на один элемент
      currentStep = gsap.to(container, {
        x: newX,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Пауза 2 секунды, затем следующий шаг
          currentStep = gsap.delayedCall(2, animateStep);
        },
      });
    };

    // Начинаем анимацию после небольшой задержки
    animation = gsap.delayedCall(0.1, animateStep);
  }
};

onMounted(() => {
  initCarousel();
});

// Переинициализируем карусель при изменении breakpoint
watch(
  [bpChanged, gtXl, deviceType],
  () => {
    initCarousel();
  },
  { flush: "post" }
);

onBeforeUnmount(() => {
  if (animation) {
    animation.kill();
    animation = null;
  }
  if (currentStep) {
    currentStep.kill();
    currentStep = null;
  }
});
</script>
<style scoped>
.carousel-item {
  @apply relative;
  @apply xl:mb-8 xl:last:mb-0 xl:w-full;

  @apply mr-6 last:mr-0 flex-shrink-0;
}
</style>  