"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { ExcursionInterface } from "@/app/types/excursion"

export default function ExcursionPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [excursion, setExcursion] = useState<ExcursionInterface | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchExcursions() {
      try {
        const response = await fetch("/api/excursions")
        const data: ExcursionInterface[] = await response.json()
        const foundExcursion = data.find((tour) => tour.id === id && tour.isAvailable)
        setExcursion(foundExcursion || null)
      } catch (error) {
        console.error("Ошибка загрузки экскурсий:", error)
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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % excursion.photoLinks.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + excursion.photoLinks.length) % excursion.photoLinks.length)
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-3xl font-bold mb-4 text-center">{excursion.name}</h1>

      <div className="mb-4 flex justify-center">
        <div className="w-full md:w-[50%]">
          <div className="relative w-full h-[300px] md:h-[500px] mb-3 bg-white rounded-lg">
            <Image
              src={excursion.photoLinks[currentImageIndex] || "/placeholder.svg"}
              alt={excursion.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
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
              {currentImageIndex + 1} / {excursion.photoLinks.length}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {excursion.photoLinks.map((photo, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 ${index === currentImageIndex ? "border-teal-500" : "border-transparent"} bg-white relative w-[100px] h-[75px]`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={`${excursion.name} фото ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            ))}
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

        <div className="mb-3">
          <h2 className="text-2xl font-semibold mb-1">Особенности</h2>
          <ul className="list-disc list-inside">
            {excursion.isFamilyFriendly && <li>Подходит для семей с детьми</li>}
            {excursion.isWinter && <li>Зимний сезон</li>}
            {excursion.isBeach && <li>Пляжный отдых</li>}
            {excursion.isOption1 && <li>Опция 1</li>}
            {excursion.isOption2 && <li>Опция 2</li>}
            {excursion.isOption3 && <li>Опция 3</li>}
          </ul>
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
