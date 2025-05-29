"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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

  const imageBasePath = "/photo/";
  const imageUrls = excursion.photoLinks.map((fileName) => `${imageBasePath}${fileName}`);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="container mx-auto px-4 pt-28">
      <h1 className="text-3xl font-bold mb-4 text-center">{excursion.name}</h1>
      <p className="text-lg text-center mb-4">{excursion.shortDescription}</p>

      {imageUrls.length > 0 && (
        <div className="mb-4 flex flex-col items-center">
          <div className="relative h-[600px] w-full max-w-4xl bg-teal-50/50 shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
            <Image
              src={imageUrls[currentImageIndex] || "/placeholder.svg"}
              alt={excursion.name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-[500px] w-auto rounded-lg object-contain"
            />
            {imageUrls.length > 1 && (
              <>
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
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              </>
            )}
          </div>

          {imageUrls.length > 1 && (
            <div className="relative w-full md:w-[60%] overflow-hidden mt-2">
              <div className="flex gap-2 overflow-x-auto px-4 py-2 scroll-smooth">
                {imageUrls.map((photo, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 h-20 w-auto relative cursor-pointer border-4 ${
                      index === currentImageIndex ? "border-teal-600" : "border-transparent"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      document.getElementById(`thumb-${index}`)?.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                        block: "nearest",
                      });
                    }}
                    id={`thumb-${index}`}
                  >
                    <Image
                      src={photo}
                      alt={`Миниатюра ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-auto rounded bg-white object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-teal-50/50 shadow-lg rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-1">Описание</h2>
        <div className="prose max-w-none">
          <ReactMarkdown>{excursion.longDescription}</ReactMarkdown>
        </div>
      </div>

      <div className="bg-teal-50/50 shadow-lg rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-semibold mb-1">Цена</h2>
        <p className="text-xl font-bold text-teal-600">
          {Math.round(Number.parseFloat(excursion.price))} $ за одного человека
        </p>
      </div>

      <div className="text-center mt-6 mb-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/book-tour?id=${excursion.id}`}
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

      {excursion.videoLinks && excursion.videoLinks.length > 0 && (
        <div className="my-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">🎥 Видеообзор экскурсии</h2>
          <div className="flex justify-center">
            <video
              controls
              loop
              playsInline
              className="rounded-lg shadow-lg max-h-[75vh]"
            >
              <source src={`/video/${excursion.videoLinks[0]}`} type="video/mp4" />
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          </div>
        </div>
      )}

      {excursion.schedule && (
        <div className="bg-teal-50/50 shadow-lg rounded-lg p-4 mb-4">
          <h2 className="text-2xl font-semibold mb-2">📅 Расписание</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{excursion.schedule}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="text-center mt-6 mb-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/book-tour?id=${excursion.id}`}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block w-full sm:w-auto"
          >
            Забронировать
          </Link>
          <Link
            href="/"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block w-full sm:w-auto mb-2 sm:mb-0"
          >
            Список экскурсий
          </Link>
        </div>
      </div>
    </div>
  );
}
