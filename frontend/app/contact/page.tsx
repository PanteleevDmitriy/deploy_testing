import { FaVk, FaTelegram, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Contact() {
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
    </div>
  )
}

