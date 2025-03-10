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
        <div className="flex items-center h-[100px] justify-between">
          <button
            className="bg-white text-black px-2 py-0.5 rounded-full hover:bg-teal-100 transition duration-300 text-xs sm:text-lg sm:px-6 sm:py-2"
            onClick={toggleMenu}
          >
            Меню
          </button>
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image
                src="https://psv4.userapi.com/s/v1/d/NK_p_rgrKlsS0P8drTT4cuN083R7REHcl87RzlSI46kymLdByjgOOwKsDpS5vwwNeFgCxW7rGkhmvuymwPY5RQ2OGnCGEhMokfXef4U7JDuI4G5MGHN1qA/logo_fon.png"
                alt="SEAWIND travel Logo"
                width={100}
                height={100}
                className="object-contain h-[100px]"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="text-white hover:text-teal-100 transition duration-300 w-[15px] h-[15px] sm:w-[48px] sm:h-[48px]" />
            </a>
            <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-teal-100 transition duration-300 w-[15px] h-[15px] sm:w-[48px] sm:h-[48px]" />
            </a>
            <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
              <FaVk className="text-white hover:text-teal-100 transition duration-300 w-[15px] h-[15px] sm:w-[48px] sm:h-[48px]" />
            </a>
            <Link
              href="/auth"
              className="bg-white text-black px-2 py-0.5 rounded-full hover:bg-teal-100 transition duration-300 text-xs sm:text-lg sm:px-6 sm:py-2"
            >
              Войти
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="py-2">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-white hover:text-teal-100 transition duration-300" onClick={closeMenu}>
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

