'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaVk, FaTelegram, FaInstagram } from 'react-icons/fa'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md z-50 sm:py-2 py-1">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="hidden sm:flex items-center">
            <Link href="/">
              <Image
                src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
                alt="SEAWIND travel Logo"
                width={140}
                height={140}
                className="object-contain h-[140px]"
              />
            </Link>
          </div>
          <div className="flex-grow flex justify-center">
            <Link href="/" className="text-lg sm:text-2xl lg:text-4xl font-bold text-white hover:text-teal-100 transition duration-300">
              SEAWIND travel
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
              <FaVk className="text-white hover:text-teal-100 transition duration-300" size={20} />
            </a>
            <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="text-white hover:text-teal-100 transition duration-300" size={20} />
            </a>
            <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-teal-100 transition duration-300" size={20} />
            </a>
            <Link href="/auth" className="bg-white text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-teal-100 transition duration-300 text-xs sm:text-sm">
              Войти
            </Link>
          </div>
        </div>
        <nav className="py-2 flex justify-between items-center">
          <div className="hidden sm:flex space-x-4">
            <Link href="/tours" className="text-white hover:text-teal-100 transition duration-300 text-lg">Экскурсии</Link>
            <Link href="/about" className="text-white hover:text-teal-100 transition duration-300 text-sm sm:text-lg">О нас</Link>
            <Link href="/reviews" className="text-white hover:text-teal-100 transition duration-300 text-lg">Отзывы</Link>
            <Link href="/faq" className="text-white hover:text-teal-100 transition duration-300 text-lg">Частые вопросы</Link>
            <Link href="/promotions" className="text-white hover:text-teal-100 transition duration-300 text-lg">Акции</Link>
            <Link href="/services" className="text-white hover:text-teal-100 transition duration-300 text-lg">Услуги</Link>
          </div>
          <div className="sm:hidden">
            <button 
              className="text-white text-lg py-2 px-4 bg-teal-600 rounded"
              onClick={toggleMobileMenu}
            >
              Меню сайта
            </button>
          </div>
          <Link href="/contact" className="bg-white text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-teal-100 transition duration-300 shadow-md text-xs sm:text-sm">
            Связаться с нами
          </Link>
        </nav>
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-2 pb-2">
            <Link href="/tours" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>Экскурсии</Link>
            <Link href="/about" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>О нас</Link>
            <Link href="/reviews" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>Отзывы</Link>
            <Link href="/faq" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>Частые вопросы</Link>
            <Link href="/promotions" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>Акции</Link>
            <Link href="/services" className="block text-white hover:text-teal-100 transition duration-300 py-2" onClick={closeMobileMenu}>Услуги</Link>
          </div>
        )}
      </div>
    </header>
  )
}

