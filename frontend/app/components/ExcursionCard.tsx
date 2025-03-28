"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ExcursionInterface } from "@/app/types/excursion";

interface ExcursionCardProps {
  excursion: ExcursionInterface;
}

export default function ExcursionCard({ excursion }: ExcursionCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % excursion.photoLinks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + excursion.photoLinks.length) % excursion.photoLinks.length);
  };

  return (
    <div className="bg-teal-50/50 shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Основное изображение с каруселью */}
      <div className="relative w-full h-[300px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
        <Image
          src={excursion.photoLinks[currentImageIndex] || "/placeholder.svg"}
          alt={excursion.name}
          fill
          className="object-contain rounded-t-lg"
        />
        {/* Кнопки управления */}
        {excursion.photoLinks.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/75 z-10"
              aria-label="Предыдущее изображение"
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 sm:p-2 rounded-full hover:bg-black/75 z-10"
              aria-label="Следующее изображение"
            >
              &#10095;
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded z-10 text-sm">
              {currentImageIndex + 1} / {excursion.photoLinks.length}
            </div>
          </>
        )}
      </div>

      {/* Информация об экскурсии */}
      <div className="p-4 bg-teal-10 rounded-b-lg flex flex-col flex-grow">
        <div className="p-2 rounded flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{excursion.name}</h3>
            <p className="text-gray-600 text-sm">{excursion.shortDescription}</p>
          </div>
          {excursion.isPopular && (
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded max-w-fit">
              Популярное
            </div>
          )}
        </div>

        <Link
          href={`/excursion/${excursion.id}`}
          className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 w-full text-center block mt-auto"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
