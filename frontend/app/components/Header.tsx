import Link from 'next/link'
import Image from 'next/image'
import { FaVk, FaTelegram, FaInstagram } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md z-50">
      <div className="container mx-auto flex items-stretch">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <Image
              src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
              alt="SEAWIND travel Logo"
              width={140}
              height={140}
              className="object-contain h-full"
            />
          </Link>
        </div>
        <div className="flex-grow flex flex-col ml-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-grow flex justify-center">
              <Link href="/" className="text-2xl font-bold text-white hover:text-teal-100 transition duration-300">
                SEAWIND travel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
                <FaVk className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white hover:text-teal-100 transition duration-300" size={24} />
              </a>
              <Link href="/auth" className="bg-white text-black px-4 py-2 rounded-full hover:bg-teal-100 transition duration-300">
                Войти
              </Link>
            </div>
          </div>
          <nav className="flex items-center justify-between h-12">
            <div className="flex space-x-4">
              <Link href="/tours" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2">Экскурсии</Link>
              <Link href="/reviews" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2">Отзывы</Link>
              <Link href="/faq" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2">Частые вопросы</Link>
              <Link href="/promotions" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2">Акции</Link>
              <Link href="/services" className="text-white hover:text-teal-100 transition duration-300 px-3 py-2">Услуги</Link>
            </div>
            <Link href="/contact" className="bg-white text-black px-4 py-1 rounded-full hover:bg-teal-100 transition duration-300 shadow-md">
              Связаться с нами
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

