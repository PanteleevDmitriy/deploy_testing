"use client"

import { useState } from "react"
import Image from "next/image"

export default function PhotosessionPage() {
  const images = [
    "/photo/photosession/photosession_1.jpg",
    "/photo/photosession/photosession_2.jpg",
    "/photo/photosession/photosession_3.jpg",
    "/photo/photosession/photosession_4.jpg",
    "/photo/photosession/photosession_5.jpg",
    "/photo/photosession/photosession_6.jpg",
    "/photo/photosession/photosession_7.jpg",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Фотосессия во Вьетнаме</h1>

      {images.length > 0 && (
        <div className="mb-4 flex flex-col items-center">
          <div className="relative h-[400px] w-full max-w-4xl bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center shadow">
            <Image
              src={images[currentImageIndex]}
              alt="Фотосессия"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[360px] w-auto object-contain rounded-lg"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
                >
                  &#10095;
                </button>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto px-2 py-2">
            {images.map((src, index) => (
              <div
                key={index}
                className={`h-20 w-auto border-4 cursor-pointer ${
                  index === currentImageIndex ? "border-teal-600" : "border-transparent"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={src}
                  alt={`Миниатюра ${index + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-auto object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-lg text-gray-700 text-center max-w-xl mx-auto">
        Фотосессия на красивых локациях, профессиональный фотограф, обработка снимков. Отличный способ сохранить воспоминания о поездке!
      </p>
    </div>
  )
}
