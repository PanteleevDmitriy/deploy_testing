import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'SEAWIND Travel - Экскурсии в городе Нячанг, Вьетнам.',
  description: 'Экскурсии в городе Нячанг, Вьетнам. Самые выгодные предложения, пляжный отдых, культурные программы. Откройте для себя лучшее вместе с SEAWIND Travel.',
  keywords: 'туры в Нячанг, отдых во Вьетнаме, экскурсии в Нячанге, горящие туры Нячанг, отдых Нячанг',
  structuredData: `
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "SEAWIND Travel",
    "description": "Организация экскурсий город Нячанг, Вьетнам. Экскурсии по всем направлениям, пляжный отдых и многое другое.",
    "url": "https://seawind-travel.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Huong Vuong street",
      "addressLocality": "Нячанг",
      "addressRegion": "Кханьхоа",
      "addressCountry": "Вьетнам"
    },
    "telephone": "+84337804880",
    "areaServed": "Вьетнам"
  }
  `
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

