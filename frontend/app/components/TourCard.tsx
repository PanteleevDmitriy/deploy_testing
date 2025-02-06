"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface TourCardProps {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  onExpand: (id: number) => void
  isExpanded: boolean
}

export default function TourCard({ id, title, description, price, images, onExpand, isExpanded }: TourCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (!isExpanded) {
      setCurrentImageIndex(0)
    }
  }, [isExpanded])

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-[333px] sm:h-[500px]">
        <Image src={images[currentImageIndex] || "/placeholder.svg"} alt={title} layout="fill" objectFit="contain" />
      </div>
      {isExpanded && (
        <div className="p-4 border-t overflow-x-auto">
          <div className="flex h-[200px] space-x-2">
            {images.map((img, index) => (
              <div key={index} className="flex-shrink-0 cursor-pointer h-full">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${title} image ${index + 1}`}
                  width={200}
                  height={200}
                  objectFit="contain"
                  onClick={() => setCurrentImageIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <Link
            href="/book-tour"
            className="bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700 text-[6px] sm:text-[8px] lg:text-sm whitespace-nowrap"
          >
            Заказать тур
          </Link>
        </div>
        {isExpanded && (
          <div>
            <p className="text-gray-600 mb-4">
              Подробное описание тура. Здесь может быть расширенная информация о маршруте, достопримечательностях,
              продолжительности экскурсии и т.д.
            </p>
            <p className="text-lg font-bold mb-4">Цена за одного человека от {price} $</p>
          </div>
        )}
        <button
          onClick={() => onExpand(id)}
          className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 w-full text-[8px] sm:text-xs lg:text-base"
        >
          {isExpanded ? "Свернуть" : "Подробнее"}
        </button>
      </div>
    </div>
  )
}

