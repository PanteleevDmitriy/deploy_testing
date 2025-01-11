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
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md z-50">
      <div className="container mx-auto flex flex-col lg:flex-row items-stretch">
        <div className="flex items-center justify-between p-2 lg:p-0">
          <Link href="/">
            <Image
              src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
              alt="SEAWIND travel Logo"
              width={140}
              height={140}
              className="object-contain h-[140px]"
            />
          </Link>
          <button 
            className="lg:hidden text-white text-xl"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? 'Закрыть' : 'Меню сайта'}
          </button>
        </div>
        <div className="flex-grow flex flex-col lg:flex-row">
          <div className="flex items-center justify-between h-16">
            <div className="flex-grow flex justify-center">
              <Link href="/" className="text-2xl lg:text-4xl font-bold text-white hover:text-teal-100 transition duration-300">
                SEAWIND travel
              </Link>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
                <FaVk className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <Link href="/auth" className="bg-white text-black px-4 py-2 rounded-full hover:bg-teal-100 transition duration-300 text-base">
                Войти
              </Link>
            </div>
          </div>
          <nav className={`lg:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row items-center justify-between lg:h-12`}>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mb-2 lg:mb-0">
              <Link href="/tours" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2 text-base lg:text-2xl" onClick={closeMobileMenu}>Экскурсии</Link>
              <Link href="/reviews" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2 text-base lg:text-2xl" onClick={closeMobileMenu}>Отзывы</Link>
              <Link href="/faq" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2 text-base lg:text-2xl" onClick={closeMobileMenu}>Частые вопросы</Link>
              <Link href="/promotions" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2 text-base lg:text-2xl" onClick={closeMobileMenu}>Акции</Link>
              <Link href="/services" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2 text-base lg:text-2xl" onClick={closeMobileMenu}>Услуги</Link>
            </div>
            <Link href="/contact" className="bg-white text-black px-4 py-1 rounded-full hover:bg-teal-100 transition duration-300 shadow-md text-base lg:text-base" onClick={closeMobileMenu}>
              Связаться с нами
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

