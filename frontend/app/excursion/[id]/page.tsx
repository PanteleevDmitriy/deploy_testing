"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ExcursionInterface } from "@/app/types/excursion";

export default function ExcursionPage() {
  const params = useParams();
  const id = Number.parseInt(params.id as string);
  const [excursion, setExcursion] = useState<ExcursionInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: ExcursionInterface[]) => {
        const foundExcursion = data.find((tour) => tour.id === id);
        setExcursion(foundExcursion || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28 text-center">
        <h1 className="text-3xl font-bold mb-4">Загрузка...</h1>
      </div>
    );
  }

  if (!excursion) {
    return (
      <div className="container mx-auto px-4 py-8 pt-28 text-center">
        <h1 className="text-3xl font-bold mb-4">Экскурсия не найдена или недоступна</h1>
        <Link href="/" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
          Список экскурсий
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % excursion.photoLinks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + excursion.photoLinks.length) % excursion.photoLinks.length);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-3xl font-bold mb-4 text-center">{excursion.name}</h1>

      {/* Карусель */}
      <div className="mb-4 flex justify-center">
        <div className="relative w-full md:w-[50%] h-[300px] md:h-[500px]">
          <Image
            src={excursion.photoLinks[currentImageIndex] || "/placeholder.svg"}
            alt={excursion.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 z-10"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 z-10"
          >
            &#10095;
          </button>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
            {currentImageIndex + 1} / {excursion.photoLinks.length}
          </div>
        </div>
      </div>

      {/* Описание экскурсии */}
      <div className="bg-white/50 shadow-lg rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-1">Описание</h2>
        <p>{excursion.longDescription}</p>
        <h2 className="text-2xl font-semibold mt-3 mb-1">Цена</h2>
        <p className="text-xl font-bold text-teal-600">
          от {Math.round(Number.parseFloat(excursion.price))} $ с человека
        </p>
      </div>

      {/* Кнопки */}
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
  );
}
