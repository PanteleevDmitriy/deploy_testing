import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SEA Wind travel - экскурсии Нячанг - Вьетнам",
  description: "Экскурсии во Вьетнаме с SEA Wind Travel",
  openGraph: {
    title: "SEA Wind travel",
    description: "Экскурсии Нячанг - Вьетнам",
    url: "https://seawindtravel.ru",
    siteName: "SEA Wind travel",
    images: [
      {
        url: "/og_image.jpg", // картинка из public
        width: 1200,
        height: 630,
        alt: "SEA Wind travel – экскурсии Нячанг",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-2EKGZ59Q1T`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2EKGZ59Q1T');
          `}
        </Script>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
