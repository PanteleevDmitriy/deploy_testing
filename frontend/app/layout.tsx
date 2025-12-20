import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";
import BgFixed from "./components/BgFixed";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SEA Wind travel - экскурсии Нячанг и Фукуок - Вьетнам",
  description: "Экскурсии Нячанг Фукуок во Вьетнаме с SEA Wind Travel",
  metadataBase: new URL("https://seawindtravel.ru"),
  openGraph: {
    title: "SEA Wind travel",
    description: "Экскурсии Нячанг/Фукуок - Вьетнам",
    siteName: "SEA Wind travel",
    images: [
      {
        url: "/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "SEA Wind travel – экскурсии Нячанг Фукуок",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const metrikaSrc = "https://mc.yandex.ru/metrika/tag.js";

  return (
    <html lang="ru" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Экскурсии Нячанг и Фукуок с SEA Wind Travel."
        />

        {/* Предзагрузка и предподключение для Яндекс.Метрики */}
        <link 
          rel="preload" 
          href={metrikaSrc}
          as="script"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      </head>

      <body className="flex flex-col">
        {/* Фиксированный фон через Next.js Image */}
        <BgFixed />

        {/* Яндекс.Метрика с оптимизированной загрузкой */}
        <Script 
          id="yandex-metrika" 
          strategy="lazyOnload"
          src={metrikaSrc}
          crossOrigin="anonymous"
          onLoad={() => {
            // Используем утверждение типа для TypeScript
            const ym = (window as any).ym;
            
            if (!ym) {
              console.warn('Yandex.Metrika script loaded but ym function not found');
              return;
            }
            
            try {
              // Инициализируем метрику с noindex для ботов
              ym(105787802, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ut: "noindex" // Помечаем трафик от поисковых роботов
              });
              
              // Отслеживаем просмотр страницы
              ym(105787802, "hit", window.location.pathname);
            } catch (e) {
              console.warn("Yandex.Metrika init failed:", e);
            }
          }}
          onError={() => {
            console.error('Failed to load Yandex.Metrika script');
          }}
        />

        {/* Fallback для пользователей с отключенным JavaScript */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/105787802"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        <ClientLayout>
          <main className="min-h-screen">{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}