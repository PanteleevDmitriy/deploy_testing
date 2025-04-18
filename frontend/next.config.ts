import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sun9-78.userapi.com',
        pathname: '/impg/**',  // Можно уточнить путь, если необходимо
      },
      {
        protocol: 'https',
        hostname: 'sun9-37.userapi.com',
        pathname: '/impg/**',
      },
      {
        protocol: 'https',
        hostname: 'sun6-23.userapi.com',
        pathname: '/impg/**',
      },
      {
        protocol: 'https',
        hostname: 'sun9-61.userapi.com',
        pathname: '/impg/**',
      },
      {
        protocol: 'https',
        hostname: 'sun9-43.userapi.com',
        pathname: '/impg/**',
      },
      {
        protocol: 'https',
        hostname: 'vk.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",  // Добавляем домен
        pathname: '/s/v1/d/**',        // Указываем путь, который будет разрешен
      },
      {
        protocol: 'https',
        hostname: 'biznes-lanch.com',  // Добавляем домен
        pathname: '/**',        // Указываем путь, который будет разрешен
      },
      {
        protocol: 'https',
        hostname: 'disk.yandex.ru',  // Добавляем домен
        pathname: '/**',        // Указываем путь, который будет разрешен
      },
      {
        protocol: 'https',
        hostname: 'downloader.disk.yandex.ru',  // Добавляем домен
        pathname: '/**',        // Указываем путь, который будет разрешен
      },
    ],
  },
};
export default nextConfig;
