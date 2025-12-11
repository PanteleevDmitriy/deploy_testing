import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";
import Image from "next/image"; // ← добавлено

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
  const isProd = process.env.NODE_ENV === "production";

  const metrikaSrc = isProd
    ? "https://mc.yandex.ru/metrika/tag.js"
    : "https://mc.yandex.ru/metrika/tag.js?debug=1";

  return (
    <html lang="ru" className="h-full">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Экскурсии Нячанг и Фукуок с SEA Wind Travel. Комфорт, опытные русские гиды, все направления."
        />

        <link rel="preconnect" href="https://mc.yandex.ru" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      </head>

      <body className={`${inter.className} flex flex-col min-h-screen relative overflow-x-hidden`}>

        {/* --- ФОН ЧЕРЕЗ NEXT/IMAGE (ОПТИМИЗИРОВАННЫЙ) --- */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/bg.png"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={70}
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>

        {/* --- МЕТРИКА --- */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                    (m[i].a=m[i].a||[]).push(arguments)
                };
                m[i].l = 1 * new Date();
                k=e.createElement(t), a=e.getElementsByTagName(t)[0];
                k.async=1; k.src='${metrikaSrc}';
                a.parentNode.insertBefore(k,a);
            })(window, document, "script", "${metrikaSrc}", "ym");

            try {
              ym(105787802, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            } catch (e) {
              console.warn("Yandex.Metrika init failed:", e);
            }
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

        {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
        <ClientLayout>
          <main>{children}</main>
        </ClientLayout>

      </body>
    </html>
  );
}
