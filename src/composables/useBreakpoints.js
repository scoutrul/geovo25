import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable для работы с брейкпоинтами
 * Возвращает реактивные флаги для различных размеров экрана
 */
export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)
  
  const isMobile = ref(windowWidth.value < 640)
  const isTablet = ref(windowWidth.value >= 640 && windowWidth.value < 1024)
  const isDesktop = ref(windowWidth.value >= 1024)
  
  const updateBreakpoints = () => {
    windowWidth.value = window.innerWidth
    isMobile.value = windowWidth.value < 640
    isTablet.value = windowWidth.value >= 640 && windowWidth.value < 1024
    isDesktop.value = windowWidth.value >= 1024
  }
  
  onMounted(() => {
    window.addEventListener('resize', updateBreakpoints)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoints)
  })
  
  return {
    windowWidth,
    isMobile,
    isTablet,
    isDesktop
  }
}

