import { ref, computed } from 'vue'
import { useBreakpoints } from './useBreakpoints'

/**
 * Composable для управления состоянием аккордиона
 * На десктопе (>= 1024px) все элементы раскрыты по умолчанию
 * На мобильных/планшетах - все закрыты
 */
export function useAccordion(itemsCount) {
  const { isDesktop } = useBreakpoints()
  
  // Массив открытых элементов (по индексу)
  const openItems = ref(new Set())
  
  // На десктопе все раскрыты по умолчанию
  if (isDesktop.value) {
    for (let i = 0; i < itemsCount; i++) {
      openItems.value.add(i)
    }
  }
  
  /**
   * Проверяет, открыт ли элемент
   */
  const isOpen = (index) => {
    return openItems.value.has(index)
  }
  
  /**
   * Переключает состояние элемента
   */
  const toggle = (index) => {
    if (openItems.value.has(index)) {
      openItems.value.delete(index)
    } else {
      openItems.value.add(index)
    }
    // Триггерим реактивность
    openItems.value = new Set(openItems.value)
  }
  
  /**
   * Открывает элемент
   */
  const open = (index) => {
    openItems.value.add(index)
    openItems.value = new Set(openItems.value)
  }
  
  /**
   * Закрывает элемент
   */
  const close = (index) => {
    openItems.value.delete(index)
    openItems.value = new Set(openItems.value)
  }
  
  /**
   * Открывает все элементы
   */
  const openAll = () => {
    for (let i = 0; i < itemsCount; i++) {
      openItems.value.add(i)
    }
    openItems.value = new Set(openItems.value)
  }
  
  /**
   * Закрывает все элементы
   */
  const closeAll = () => {
    openItems.value.clear()
    openItems.value = new Set(openItems.value)
  }
  
  return {
    openItems,
    isOpen,
    toggle,
    open,
    close,
    openAll,
    closeAll,
    isDesktop
  }
}

