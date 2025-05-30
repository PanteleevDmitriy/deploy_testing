import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-teal-100 py-8 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Контакты</h3>
            <p className="text-sm text-gray-700">
              Email: seawindjourney@gmail.com
              <br />
              Телефон: +84337804880
            </p>
            <p className="text-sm text-gray-700">
              Instagram: @sea.wind.travel
              <br />
              Telegram: @StreZig
            </p>
            <div className="mt-4">
              <Link
                href="/contact"
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-black hover:text-teal-700 transition duration-300">
                  Экскурсии
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black hover:text-teal-700 transition duration-300">
                  Информация о нас
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-black hover:text-teal-700 transition duration-300">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-black hover:text-teal-700 transition duration-300">
                  Полезные статьи
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Подписаться на новости</h3>
            <p className="text-sm text-gray-700 mb-4">
              Узнайте о ярких локациях в городе и окрестностях. Куда сходить? Где поесть? Не пропустите всё самое интересное!
            </p>
            <a
              href="https://www.instagram.com/sea.wind.travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Подписаться
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-700">
          <p>© SEA Wind travel. Все права защищены.</p>
          <p>Международгная туристическая лицензия</p>
          <p>№ 56-266/2023 / CDLQGVN-GP LHQT</p>

        </div>
      </div>
    </footer>
  )
}
