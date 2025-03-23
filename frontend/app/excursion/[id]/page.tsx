"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ExcursionInterface } from "@/app/types/excursion"

export default function ExcursionPage() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)

  const [excursion, setExcursion] = useState<ExcursionInterface | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)

    async function fetchExcursions() {
      try {
        const response = await fetch(`/api/excursions`)
        if (!response.ok) throw new Error("Ошибка загрузки экскурсий")

        const data: ExcursionInterface[] = await response.json()
        const foundExcursion = data.find((tour) => tour.id === id && tour.isAvailable) || null
        setExcursion(foundExcursion)
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      }
    }

    fetchExcursions()
  }, [id])

  if (!excursion) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28 text-center">
        <h1 className="text-3xl font-bold mb-4">Экскурсия не найдена или недоступна</h1>
        <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
          Список экскурсий
        </Link>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (excursion.photoLinks?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (excursion.photoLinks?.length || 1)) % (excursion.photoLinks?.length || 1))
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-3xl font-bold mb-4 text-center">{excursion.name}</h1>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-[50%]">
          <div className="relative w-full h-auto mb-3 bg-white rounded-lg">
            {excursion.photoLinks && excursion.photoLinks.length > 0 ? (
              <Image
                src={excursion.photoLinks[currentImageIndex]}
                alt={excursion.name}
                width={800}
                height={500}
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg"
              />
            ) : (
              <Image
                src="/placeholder.svg"
                alt="Изображение отсутствует"
                width={800}
                height={500}
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                aria-label="Предыдущее изображение"
              >
                &#10094;
              </button>
              <button
                onClick={nextImage}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
                aria-label="Следующее изображение"
              >
                &#10095;
              </button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded z-10">
              {currentImageIndex + 1} / {excursion.photoLinks?.length || 1}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
        <div className="mb-3">
          <h2 className="text-2xl font-semibold mb-1">Описание</h2>
          <p>{excursion.longDescription}</p>
        </div>

        <div className="mb-3">
          <h2 className="text-2xl font-semibold mb-1">Цена</h2>
          <p className="text-xl font-bold text-teal-600">
            от {Math.round(Number.parseFloat(excursion.price))} $ с человека
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/book-tour"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block w-full sm:w-auto"
          >
            Забронировать
          </Link>
          <Link
            href="/"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block w-full sm:w-auto"
          >
            Список экскурсий
          </Link>
        </div>
      </div>
    </div>
  )
}
