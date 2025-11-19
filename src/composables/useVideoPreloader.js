import { ref, readonly } from "vue";

// Глобальное состояние прелоадера
const isLoading = ref(true);
const videosToLoad = ref(new Set());
const loadedVideos = ref(new Set());

/**
 * Композабл для глобального управления прелоадингом видео
 *
 * @returns {Object} API для управления прелоадером
 */
export function useVideoPreloader() {
  /**
   * Регистрирует видео для прелоадинга
   * @param {string} videoSrc - URL видео
   */
  const registerVideo = (videoSrc) => {
    if (!videoSrc) return;
    videosToLoad.value.add(videoSrc);
  };

  /**
   * Отмечает видео как загруженное
   * @param {string} videoSrc - URL видео
   */
  const markVideoLoaded = (videoSrc) => {
    if (!videoSrc) return;
    loadedVideos.value.add(videoSrc);

    // Проверяем, все ли видео загружены
    checkAllVideosLoaded();
  };

  /**
   * Проверяет, загружены ли все видео
   */
  const checkAllVideosLoaded = () => {
    const allLoaded =
      videosToLoad.value.size > 0 &&
      videosToLoad.value.size === loadedVideos.value.size;

    if (allLoaded) {
      // Небольшая задержка для плавности
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    }
  };

  /**
   * Сброс состояния прелоадера
   */
  const reset = () => {
    isLoading.value = true;
    videosToLoad.value.clear();
    loadedVideos.value.clear();
  };

  /**
   * Принудительное завершение загрузки (для отладки или таймаутов)
   */
  const forceComplete = () => {
    isLoading.value = false;
  };

  return {
    // Состояние
    isLoading: readonly(isLoading),
    videosToLoad: readonly(videosToLoad),
    loadedVideos: readonly(loadedVideos),
    
    // Методы
    registerVideo,
    markVideoLoaded,
    reset,
    forceComplete,
  };
}
