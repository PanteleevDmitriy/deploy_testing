import Link from 'next/link'
import { FaVk, FaTelegram, FaInstagram } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 shadow-md z-50">
      <div className="relative flex items-center justify-end h-16 px-4">
        <div className="absolute left-0 top-0 h-full">
          <Link href="/" className="flex items-center h-full">
            <img
              src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg"
              alt="SEAWIND travel Logo"
              className="h-full w-auto object-cover"
            />
          </Link>
        </div>
        <Link href="/" className="mr-auto ml-16 text-2xl font-bold text-white hover:text-teal-100 transition duration-300">
          SEAWIND travel
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-teal-100 transition duration-300">Главная</Link>
          <Link href="/all-tours" className="text-white hover:text-teal-100 transition duration-300">Туры</Link>
          <Link href="/about" className="text-white hover:text-teal-100 transition duration-300">О нас</Link>
        </nav>
        <div className="flex items-center space-x-4 ml-6">
          <a href="https://vk.com/seawind_travel" target="_blank" rel="noopener noreferrer">
            <FaVk className="text-white hover:text-teal-100 transition duration-300" size={24} />
          </a>
          <a href="https://t.me/Dm_Pn" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="text-white hover:text-teal-100 transition duration-300" size={24} />
          </a>
          <a href="https://www.instagram.com/sea.wind.travel/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-teal-100 transition duration-300" size={24} />
          </a>
          <Link href="/auth" className="bg-white text-teal-600 px-4 py-2 rounded hover:bg-teal-100 transition duration-300">
            Войти
          </Link>
        </div>
      </div>
    </header>
  )
}

