import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Контакты</h3>
            <p className="text-sm text-gray-600">
              Email: seawindjourney@gmail.com
              <br />
              Телефон: +84337804880
            </p>
            <p className="text-sm text-gray-600">
              Instagram: @sea.wind.travel
              <br />
              Telegram: @Dm_Pn
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
                <Link href="/" className="text-blue-600 hover:underline">
                  Экскурсии
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 hover:underline">
                  Информация о нас
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-blue-600 hover:underline">
                  Отзывы туристов
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-600 hover:underline">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-blue-600 hover:underline">
                  Полезные статьи
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Подписаться на новости</h3>
            <p className="text-sm text-gray-600 mb-4">
              Узнайте о ярких локациях в городе и окресностях. Куда сходить? Где поесть? Всё самое интересное в нашем
              телеграм канале!
            </p>
            <a
              href="https://t.me/Dm_Pn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Подписаться
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© SEAWIND travel. Все права защищены.</p>
          <p>Туристическая лицензия № 7777777</p>
        </div>
      </div>
    </footer>
  )
}

