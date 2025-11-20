import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Создает анимацию fade-out для hero секции при скролле
 * @param {Ref} targetRef - Ref элемента для анимации
 * @param {Object} options - Опции анимации
 * @param {number} options.multiplier - Множитель для скорости fade (по умолчанию 1.25)
 * @returns {Object} - Объект с методом cleanup
 */
export function useHeroFadeAnimation(targetRef, options = {}) {
  const { multiplier = 1.6 } = options;
  let scrollTriggerInstance = null;

  onMounted(() => {
    if (targetRef.value) {
      const element = targetRef.value.$el || targetRef.value;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const blurValue = self.progress * 5;
          gsap.set(element, {
            opacity: 1 - self.progress * multiplier,
            filter: `blur(${blurValue}px)`,
          });
        },
      });
    }
  });

  onBeforeUnmount(() => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  });

  return {
    cleanup: () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    },
  };
}
