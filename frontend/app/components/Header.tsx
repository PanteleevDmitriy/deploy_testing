"use client";

import Link from "next/link";
import Image from "next/image";
import { FaTelegram, FaInstagram, FaVk } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      const name = decodeURIComponent(segment.replace(/-/g, " "));
      return { name, href };
    });

  return (
    <header className="fixed top-0 left-0 right-0 bg-teal-100 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-[100px] justify-between">
          {/* Бургер-кнопка с анимацией */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 relative z-50 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <span
              className={clsx(
                "w-6 h-0.5 bg-blue-600 rounded transition-transform duration-300",
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              )}
            />
            <span
              className={clsx(
                "w-6 h-0.5 bg-blue-600 rounded transition-all duration-300 my-1",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={clsx(
                "w-6 h-0.5 bg-blue-600 rounded transition-transform duration-300",
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
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
              <FaTelegram className="text-blue-900 hover:text-blue-700 transition duration-300 w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-blue-900 hover:text-blue-700 transition duration-300 w-6 h-6" />
            </a>
            <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
              <FaVk className="text-blue-900 hover:text-blue-700 transition duration-300 w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Выпадающее меню */}
        {isMenuOpen && (
          <nav className="py-4 transition-all duration-300">
            <div className="flex flex-col space-y-3 text-lg">
              <Link href="/" className="hover:text-blue-700" onClick={closeMenu}>
                Экскурсии
              </Link>
              <Link href="/about" className="hover:text-blue-700" onClick={closeMenu}>
                Информация о нас
              </Link>
              <Link href="/faq" className="hover:text-blue-700" onClick={closeMenu}>
                Часто задаваемые вопросы
              </Link>
              <Link href="/articles" className="hover:text-blue-700" onClick={closeMenu}>
                Полезные статьи
              </Link>
              <Link href="/auth" className="hover:text-blue-700" onClick={closeMenu}>
                Войти
              </Link>
            </div>
          </nav>
        )}

        {/* Хлебные крошки */}
        <div className="py-2 text-sm text-gray-700 flex flex-wrap space-x-2">
          <Link href="/" className="hover:underline text-blue-700">Главная</Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.href} className="flex items-center space-x-2">
              <span className="mx-1">/</span>
              <Link href={crumb.href} className="hover:underline text-blue-700 capitalize">
                {crumb.name}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
