'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      <div className="relative w-full h-[500px]">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-auto h-full object-contain mx-auto"
        />
      </div>
      {isExpanded && (
        <div className="p-4 border-t overflow-x-auto" style={{ height: '200px' }}>
          <div className="flex h-full space-x-2">
            {images.map((img, index) => (
              <div key={index} className="flex-shrink-0 cursor-pointer h-40">
                <img
                  src={img}
                  alt={`${title} image ${index + 1}`}
                  className="h-40 w-auto object-cover"
                  loading="lazy"
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
          <Link href="/book-tour" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Заказать тур
          </Link>
        </div>
        <p className="text-lg font-bold mb-4">{price} $</p>
        {isExpanded && (
          <p className="text-gray-600 mb-4">
            Подробное описание тура. Здесь может быть расширенная информация о маршруте, 
            достопримечательностях, продолжительности экскурсии и т.д.
          </p>
        )}
        <button 
          onClick={() => onExpand(id)}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full"
        >
          {isExpanded ? 'Свернуть' : 'Подробнее'}
        </button>
      </div>
    </div>
  )
}

