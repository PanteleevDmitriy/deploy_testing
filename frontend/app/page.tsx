"use client"

import { useState } from "react"
import TourCard from "./components/TourCard"
import Link from "next/link"
import { tours } from "./data/tours"

const mainPageTours = tours.filter((tour) => tour.isMainPage)

export default function Home() {
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null)

  const handleExpand = (id: number) => {
    setExpandedTourId(expandedTourId === id ? null : id)
  }

  return (
    <div className="pt-32">
      <section className="bg-white py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            Экскурсии по Вьетнаму
            <br />
            город Нячанг
          </h1>
          <p className="text-lg sm:text-xl mb-4 text-center">Добро пожаловать на сайт компании SEAWIND!</p>
          <p className="mb-4 text-center">
            Мы проводим экскурсии по всем направлениям, у нас русские гиды и огромный опыт в туризме.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Популярные туры</h2>
          <div className="space-y-8">
            {mainPageTours.map((tour) => (
              <div key={tour.id} className="flex justify-center">
                <div className="w-full md:w-[70%]">
                  <TourCard
                    id={tour.id}
                    title={tour.title}
                    description={tour.description}
                    price={tour.price}
                    images={tour.images}
                    onExpand={handleExpand}
                    isExpanded={expandedTourId === tour.id}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/tours"
              className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 inline-block"
            >
              Все туры
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

