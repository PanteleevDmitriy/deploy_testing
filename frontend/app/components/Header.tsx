"use client"

import Link from "next/link"
import Image from "next/image"
import { FaTelegram, FaInstagram, FaVk } from "react-icons/fa"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-[100px]">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
                alt="SEAWIND travel Logo"
                width={124}
                height={124}
                className="object-contain h-[100px]"
              />
            </Link>
          </div>
          <button
            className="ml-4 text-white text-lg py-2 px-6 bg-teal-600 rounded-full shadow-md hover:bg-teal-700 transition duration-300 sm:text-base"
            onClick={toggleMenu}
          >
            Меню
          </button>
          <div className="flex-grow flex justify-center">
            <Link
              href="/"
              className="hidden sm:block text-xl sm:text-2xl lg:text-3xl font-bold text-white hover:text-teal-100 transition duration-300"
            >
              SEAWIND travel
            </Link>
            <Link href="/" className="sm:hidden">
              <Image
                src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
                alt="SEAWIND travel Logo"
                width={80}
                height={80}
                className="object-contain h-[80px]"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="text-white hover:text-teal-100 transition duration-300 w-[30px] h-[30px] sm:w-[15px] sm:h-[15px]" />
            </a>
            <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-teal-100 transition duration-300 w-[30px] h-[30px] sm:w-[15px] sm:h-[15px]" />
            </a>
            <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
              <FaVk className="text-white hover:text-teal-100 transition duration-300 w-[30px] h-[30px] sm:w-[15px] sm:h-[15px]" />
            </a>
            <Link
              href="/auth"
              className="bg-white text-black px-3 py-1 rounded-full hover:bg-teal-100 transition duration-300 text-sm sm:text-xs sm:px-2 sm:py-0.5"
            >
              Войти
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="py-2">
            <div className="flex flex-col space-y-2">
              <Link
                href="/tours"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Экскурсии
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Информация о нас
              </Link>
              <Link
                href="/reviews"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Отзывы туристов
              </Link>
              <Link href="/faq" className="text-white hover:text-teal-100 transition duration-300" onClick={closeMenu}>
                Часто задаваемые вопросы
              </Link>
              <Link
                href="/promotions"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Акции и предложения
              </Link>
              <Link
                href="/services"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Услуги
              </Link>
              <Link
                href="/articles"
                className="text-white hover:text-teal-100 transition duration-300"
                onClick={closeMenu}
              >
                Полезные статьи
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

