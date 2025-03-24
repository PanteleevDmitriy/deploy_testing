"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { ExcursionInterface } from "@/app/types/excursion";

export default function ExcursionPage() {
  const params = useParams();
  const id = Number.parseInt(params.id as string);
  const [excursions, setExcursions] = useState<ExcursionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: ExcursionInterface[]) => {
        setExcursions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const excursion = excursions.find((tour) => tour.id === id);

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
        </div>
      </div>
    </div>
  );
}