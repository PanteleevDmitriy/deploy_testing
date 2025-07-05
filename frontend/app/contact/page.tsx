"use client"

import { FaVk, FaTelegram, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Связаться с нами</h1>
      <ul className="space-y-6 text-lg max-w-md mx-auto">
        <li className="flex items-center">
          <FaTelegram className="text-blue-500 mr-3" size={24} />
          <a
            href="https://t.me/StreZig"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Telegram
          </a>
        </li>
        <li className="flex items-center">
          <FaWhatsapp className="text-green-500 mr-3" size={24} />
          <a
            href="https://wa.me/+79241075733"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            WhatsApp
          </a>
        </li>
        <li className="flex items-center">
          <FaInstagram className="text-pink-600 mr-3" size={24} />
          <a
            href="https://www.instagram.com/sea.wind.travel/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline"
          >
            Instagram
          </a>
        </li>
        <li className="flex items-center">
          <FaVk className="text-blue-600 mr-3" size={24} />
          <a
            href="https://vk.com/seawind_travel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            VKontakte
          </a>
        </li>

        <li className="flex items-center">
          <FaPhone className="text-green-600 mr-3" size={24} />
          <a
            href="tel:+84337804880"
            className="text-green-600 hover:underline"
          >
            +84337804880
          </a>
        </li>
      </ul>
    </div>
  )
}
