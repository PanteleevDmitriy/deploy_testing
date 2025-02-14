"use client"

import { useState } from "react"
import { FaVk, FaTelegram, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Contact() {
  const [contactMethod, setContactMethod] = useState("")
  const [contactValue, setContactValue] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { contactMethod, contactValue })
    // You could also add some feedback for the user here
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.")
    // Reset form
    setContactMethod("")
    setContactValue("")
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Связаться с нами</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Социальные сети</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaVk className="text-blue-600 mr-2" size={24} />
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
              <FaInstagram className="text-pink-600 mr-2" size={24} />
              <a
                href="https://www.instagram.com/sea.wind.travel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Мессенджеры</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <FaTelegram className="text-blue-500 mr-2" size={24} />
              <a
                href="https://t.me/Dm_Pn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Telegram
              </a>
            </li>
            <li className="flex items-center">
              <FaWhatsapp className="text-green-500 mr-2" size={24} />
              <a
                href="https://wa.me/+84337804880"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Форма обратной связи</h2>
        <p className="mb-4">
          Вы можете оставить номер телефона для месенджеров WhatsApp или Telegram, или адрес электронной почты, и мы
          сами свяжемся с вами.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contactMethod" className="block mb-2">
              Выберите способ связи:
            </label>
            <select
              id="contactMethod"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Выберите...</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label htmlFor="contactValue" className="block mb-2">
              {contactMethod === "email" ? "Email" : "Номер телефона"}:
            </label>
            <input
              type={contactMethod === "email" ? "email" : "tel"}
              id="contactValue"
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}

