import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Контакты</h3>
            <p className="text-sm text-gray-600">
              Email: seawindjourney@gmail.com<br />
              Телефон: +84337804880
            </p>
            <p className="text-sm text-gray-600">
              Instagram: @sea.wind.travel<br />
              Telegram: @Dm_Pn
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Ссылки</h3>
            <ul className="space-y-2">
              <li><Link href="/tours" className="text-blue-600 hover:underline">Экскурсии</Link></li>
              <li><Link href="/reviews" className="text-blue-600 hover:underline">Отзывы</Link></li>
              <li><Link href="/faq" className="text-blue-600 hover:underline">Часто задаваемые вопросы</Link></li>
              <li><Link href="/promotions" className="text-blue-600 hover:underline">Акции</Link></li>
              <li><Link href="/services" className="text-blue-600 hover:underline">Услуги</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Подписаться на новости</h3>
            <p className="text-sm text-gray-600 mb-2">Подпишитесь на наши новости и акции</p>
            <form className="flex flex-col">
              <input type="email" placeholder="Ваш email" className="px-3 py-2 border rounded mb-2" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Подписаться
              </button>
            </form>
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

