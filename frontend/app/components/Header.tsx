"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTelegram, FaInstagram, FaVk } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-teal-100 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-[60px] justify-between">
          {/* Бургер */}
          <button
            className="relative w-6 h-5 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                "absolute h-0.5 w-full bg-black transition duration-300",
                isMenuOpen ? "rotate-45 top-2.5" : "top-0"
              )}
            />
            <span
              className={clsx(
                "absolute h-0.5 w-full bg-black transition duration-300",
                isMenuOpen ? "opacity-0" : "top-2.5"
              )}
            />
            <span
              className={clsx(
                "absolute h-0.5 w-full bg-black transition duration-300",
                isMenuOpen ? "-rotate-45 top-2.5" : "top-5"
              )}
            />
          </button>

          {/* Логотип */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <Image
                src="/logo_text.PNG"
                alt="SEAWind travel Logo"
                width={100}
                height={100}
                className="object-contain h-[100px]"
              />
            </Link>
          </div>

          {/* Соцсети */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="text-blue-900 hover:text-blue-700 transition duration-300 w-[15px] h-[15px] sm:w-[32px] sm:h-[32px]" />
            </a>
            <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-blue-900 hover:text-blue-700 transition duration-300 w-[15px] h-[15px] sm:w-[32px] sm:h-[32px]" />
            </a>
            <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
              <FaVk className="text-blue-900 hover:text-blue-700 transition duration-300 w-[15px] h-[15px] sm:w-[32px] sm:h-[32px]" />
            </a>
          </div>
        </div>

        {/* Выпадающее меню */}
        {isMenuOpen && (
          <nav className="py-2">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-black hover:text-blue-700 transition duration-300" onClick={closeMenu}>
                Главная
              </Link>
              <Link href="/about" className="text-black hover:text-blue-700 transition duration-300" onClick={closeMenu}>
                Информация о нас
              </Link>
              <Link href="/faq" className="text-black hover:text-blue-700 transition duration-300" onClick={closeMenu}>
                Часто задаваемые вопросы
              </Link>
              <Link href="/articles" className="text-black hover:text-blue-700 transition duration-300" onClick={closeMenu}>
                Полезные статьи
              </Link>
              <Link href="/auth" className="text-black hover:text-blue-700 transition duration-300" onClick={closeMenu}>
                Войти в систему
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
