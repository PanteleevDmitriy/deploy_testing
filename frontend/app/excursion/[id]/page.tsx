"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { tours } from "@/app/data/tours"

export default function ExcursionPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number.parseInt(params.id as string)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Находим экскурсию по id и проверяем, что она доступна
  const excursion = tours.find((tour) => tour.id === id && tour.isAvailable)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Если экскурсия не найдена или недоступна, показываем сообщение
  if (!excursion) {
    return (
      <div className="container mx-auto px-4 py-16 pt-32 text-center">
        <h1 className="text-3xl font-bold mb-8">Экскурсия не найдена или недоступна</h1>
        <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
          Вернуться на главную
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
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">{excursion.name}</h1>

      <div className="mb-8">
        <div className="relative w-full h-[300px] md:h-[500px] mb-4">
          <Image
            src={excursion.photoLinks[currentImageIndex] || "/placeholder.svg"}
            alt={excursion.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label="Предыдущее изображение"
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label="Следующее изображение"
            >
              &#10095;
            </button>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {currentImageIndex + 1} / {excursion.photoLinks.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {excursion.photoLinks.map((photo, index) => (
            <div
              key={index}
              className={`cursor-pointer border-2 ${index === currentImageIndex ? "border-teal-500" : "border-transparent"}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={photo || "/placeholder.svg"}
                alt={`${excursion.name} фото ${index + 1}`}
                width={100}
                height={75}
                objectFit="cover"
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Описание</h2>
          <p>{excursion.longDescription}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Цена</h2>
          <p className="text-xl font-bold text-teal-600">
            от {Math.round(Number.parseFloat(excursion.price))} $ с человека
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Особенности</h2>
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
        <Link
          href="/book-tour"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block mr-4"
        >
          Забронировать
        </Link>
        <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block">
          Назад к списку экскурсий
        </Link>
      </div>
    </div>
  )
}

