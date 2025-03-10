"use client"
import ExcursionCard from "./components/ExcursionCard"
import { tours } from "./data/tours"

export default function Home() {
  // Фильтруем только доступные и популярные экскурсии для главной страницы
  const availablePopularTours = tours.filter((tour) => tour.isAvailable && tour.isPopular).sort((a, b) => a.id - b.id)

  return (
    <div className="pt-28">
      <section className="bg-white py-2 sm:py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Вас приветствует компания SEA Wind travel</h1>
          <p className="text-lg sm:text-xl mb-2 text-center">С нами ваш отдых будет незабываемым!</p>
          <p className="mb-2 text-center">
            Мы предлагаем экскурсии по всем направлениям. Мы гарантируем комфорт и качество. У нас компетентные русские
            гиды и большой опыт в туризме.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Наши экскурсии</h2>

          {availablePopularTours.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xl">Экскурсии не найдены</p>
            </div>
          ) : (
            <div className="space-y-6">
              {availablePopularTours.map((excursion) => (
                <div key={excursion.id} className="flex justify-center">
                  <div className="w-full md:w-[70%]">
                    <ExcursionCard excursion={excursion} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

