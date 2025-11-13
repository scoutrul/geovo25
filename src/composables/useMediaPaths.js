import { reactive } from "vue";

/**
 * Функция для преобразования путей к медиа файлам
 * Файлы из public доступны по абсолютным путям, начиная с /
 * @param {string} path - Путь к медиа файлу
 * @returns {string} - Обработанный путь
 */
function resolveAssetPath(path) {
  if (!path) return path;
  // Если путь уже является URL или начинается с http/https, возвращаем как есть
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  
  // Если путь начинается с /, значит это уже абсолютный путь из public
  // Просто возвращаем его как есть
  if (path.startsWith("/")) {
    return path;
  }
  
  // Если путь начинается с ./assets/, преобразуем в /assets/
  if (path.startsWith("./assets/")) {
    return path.replace("./", "/");
  }
  
  // Если путь начинается с assets/, добавляем /
  if (path.startsWith("assets/")) {
    return `/${path}`;
  }
  
  // В остальных случаях возвращаем как есть
  return path;
}

/**
 * Рекурсивно преобразует пути к медиа в объекте данных
 * @param {any} obj - Объект или массив для обработки
 * @returns {any} - Обработанный объект или массив
 */
function processMediaPaths(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => processMediaPaths(item));
  } else if (obj && typeof obj === "object") {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "src" || key === "icon" || key === "image") {
        processed[key] = resolveAssetPath(value);
      } else {
        processed[key] = processMediaPaths(value);
      }
    }
    return processed;
  }
  return obj;
}

/**
 * Композбл для обработки данных с медиа путями
 * @param {Object} data - Исходные данные
 * @returns {Object} - Реактивный объект с обработанными путями к медиа
 */
export function useMediaPaths(data) {
  const processedData = processMediaPaths(data);
  return reactive(processedData);
}

