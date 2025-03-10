"use client"
import ExcursionCard from "./components/ExcursionCard"
import { tours } from "./data/tours"

export default function Home() {
  // Фильтруем только доступные и популярные экскурсии для главной страницы
  const availablePopularTours = tours.filter((tour) => tour.isAvailable && tour.isPopular).sort((a, b) => a.id - b.id)

  return (
    <div className="pt-32">
      <section className="bg-white py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Вас приветствует компания SEA Wind travel</h1>
          <p className="text-lg sm:text-xl mb-4 text-center">С нами ваш отдых будет незабываемым!</p>
          <p className="mb-4 text-center">
            Мы предлагаем экскурсии по всем направлениям. Мы гарантируем комфорт и качество. У нас компетентные русские
            гиды и большой опыт в туризме.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Популярные экскурсии</h2>

          {availablePopularTours.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl">Экскурсии не найдены</p>
            </div>
          ) : (
            <div className="space-y-8">
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

