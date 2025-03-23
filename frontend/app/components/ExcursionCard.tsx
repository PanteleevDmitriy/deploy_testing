"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { ExcursionInterface } from "../types/excursion"

interface ExcursionCardProps {
  excursion: ExcursionInterface
}

export default function ExcursionCard({ excursion }: ExcursionCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % excursion.photoLinks.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + excursion.photoLinks.length) % excursion.photoLinks.length)
  }

  return (
    <div className="bg-glass shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-[333px] sm:h-[500px]">
        <Image
          src={excursion.photoLinks[currentImageIndex] || "/placeholder.svg"}
          alt={excursion.name}
          layout="fill"
          objectFit="contain"
          className="rounded-t-lg"
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
      <div className="p-4 bg-glass rounded-b-lg">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold">{excursion.name}</h3>
            <p className="text-gray-600">{excursion.shortDescription}</p>
          </div>
        </div>
        <Link
          href={`/excursion/${excursion.id}`}
          className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 w-full text-[8px] sm:text-xs lg:text-base block text-center mt-4"
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}
