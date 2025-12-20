import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Только webp
    formats: ['image/webp'],
    
    // Оптимальные размеры для вашего сайта
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
    
    // Размеры для иконок и мелких изображений
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Год кеша для оптимизированных изображений
    minimumCacheTTL: 31536000,
    
    // Безопасность - запрещаем SVG
    dangerouslyAllowSVG: false,
    
    // Показывать картинки, а не скачивать
    contentDispositionType: 'inline',
    
    // Только локальные изображения
    remotePatterns: [],
  },

  // Включаем сжатие
  compress: true,

  // Экспериментальные фичи для CSS оптимизации
  // Если будет ошибка сборки - закомментируй следующую строку:
  experimental: {
    optimizeCss: true,  // Критический CSS
  },
  
  // Убираем заголовок "X-Powered-By"
  poweredByHeader: false,
  
  // Отключаем source maps в продакшене для уменьшения размера билда
  productionBrowserSourceMaps: false,
};

export default nextConfig;