import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
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

        {/* Яндекс.Метрика - ПРОСТОЙ РАБОЧИЙ КОД */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              <!-- Yandex.Metrika counter -->
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "${metrikaSrc}", "ym");
            
              ym(105787802, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ut: "noindex"
              });
              <!-- /Yandex.Metrika counter -->
            `.replace(/<!--/g, '<'+'!--').replace(/-->/g, '--'+'>')
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