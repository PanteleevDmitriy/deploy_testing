import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";

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
  const isProd =
    typeof window !== "undefined" && window.location.hostname === "seawindtravel.ru";

  const metrikaSrc = isProd
    ? "https://mc.yandex.ru/metrika/tag.js?id=105787802"
    : "https://mc.yandex.ru/tag_debug/metrika/tag.js?id=105787802";

  return (
    <html lang="ru" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Экскурсии Нячанг и Фукуок с SEA Wind Travel. Комфорт, опытные русские гиды, все направления."
        />

        {/* Preload глобального CSS */}
        <link rel="preload" href="/globals.css" as="style" />

        {/* Yandex Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) return;
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0];
                k.async=1;
                k.src='${metrikaSrc}';
                a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'ym');

            ym(105787802, 'init', {
                ssr:true,
                webvisor:true,
                clickmap:true,
                ecommerce:"dataLayer",
                accurateTrackBounce:true,
                trackLinks:true
            });
          `}
        </Script>

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/105787802"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>

      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>
      </body>
    </html>
  );
}
