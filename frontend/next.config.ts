// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Только webp
    formats: ['image/webp'],
    
    // Оптимальные размеры для вашего сайта (без 1920px)
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
    remotePatterns: [], // Пустой массив = только свои картинки с сервера
  },

  // Включаем сжатие
  compress: true,

  // Экспериментальные фичи для CSS оптимизации
  experimental: {
    optimizeCss: true,  // Критический CSS
  },
  
  // Убираем заголовок "X-Powered-By"
  poweredByHeader: false,
};

export default nextConfig;