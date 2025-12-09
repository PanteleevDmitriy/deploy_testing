"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { ExcursionInterface } from "@/app/types/excursion";

/**
 * Надёжный FloatingBookingBar:
 * - контейнер создаётся синхронно (useRef)
 * - портал прикрепляется в useEffect
 * - показывает панель по умолчанию
 * - скрывает при скролле внизу (thresholdBottom px) или при видимости #booking-bottom (observer)
 */
function FloatingBookingBar({ id }: { id: number }) {
  const [visible, setVisible] = useState(true);
  // создаём элемент синхронно, чтобы не было "null" при первом рендере
  const containerRef = useRef<HTMLDivElement | null>(typeof document !== "undefined" ? document.createElement("div") : null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollHandlerRef = useRef<() => void>(() => {});

  useEffect(() => {
    // прикрепляем контейнер в body
    const el = containerRef.current!;
    if (!el) return;
    document.body.appendChild(el);
    return () => {
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // threshold в пикселях: насколько близко к низу прячем панель
    const thresholdBottom = 150;

    // проверка позиции скролла (true -> show)
    const checkScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const innerH = window.innerHeight;
      const scrollBottom = scrollTop + innerH;
      const docHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      // если пользователь долистал до низа (с учётом threshold) -> прячем
      const isNearBottom = scrollBottom >= docHeight - thresholdBottom;
      setVisible(!isNearBottom);
    };

    // throttle простая (выполняется максимум раз в 100ms)
    let ticking = false;
    const throttled = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        checkScroll();
        setTimeout(() => {
          ticking = false;
        }, 100);
      });
    };

    scrollHandlerRef.current = throttled;

    // initial check — показываем панель по умолчанию, затем корректируем
    setVisible(true);
    checkScroll();

    window.addEventListener("scroll", throttled, { passive: true });
    window.addEventListener("resize", throttled);

    // Дополнительно: если есть реальный элемент #booking-bottom — наблюдаем через IntersectionObserver
    const target = document.getElementById("booking-bottom");
    if (target) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            // если нижний блок виден — скрываем
            setVisible(!entry.isIntersecting);
          }
        },
        { threshold: 0 }
      );
      observerRef.current.observe(target);
    } else {
      // если target появится позже — короткий поллинг (несколько попыток)
      let attempts = 0;
      const interval = setInterval(() => {
        const t = document.getElementById("booking-bottom");
        attempts++;
        if (t || attempts > 15) {
          clearInterval(interval);
          if (t) {
            observerRef.current = new IntersectionObserver(
              (entries) => {
                const entry = entries[0];
                if (entry) {
                  setVisible(!entry.isIntersecting);
                }
              },
              { threshold: 0 }
            );
            observerRef.current.observe(t);
          }
        }
      }, 150);
      // очистка интервала на unmount
      return () => clearInterval(interval);
    }

    return () => {
      window.removeEventListener("scroll", throttled);
      window.removeEventListener("resize", throttled);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // рендерим ничего, если контейнер ещё не создан (теоретически контейнер создан синхронно)
  if (!containerRef.current) return null;
  if (!visible) return null;

  const bar = (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-[9999]
        bg-white/95 backdrop-blur-md shadow-xl
        px-4 py-3
        border-t border-teal-200
      "
      role="dialog"
      aria-label="Плавающая панель бронирования"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/book_tour?id=${id}`}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 w-full text-center"
        >
          Забронировать
        </Link>
        <Link
          href="/"
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 w-full text-center"
        >
          Список экскурсий
        </Link>
      </div>
    </div>
  );

  return createPortal(bar, containerRef.current);
}

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
        <Link href="/" className="bg-teal-600 текст-white px-6 py-3 rounded-lg hover:bg-teal-700">
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
    <div className="container mx-auto px-4 pt-28 bg-teal-50/20 shadow-xl rounded-xl backdrop-blur-sm p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{excursion.name}</h1>
      <p className="text-lg text-center mb-4">{excursion.shortDescription}</p>

      {imageUrls.length > 0 && (
        <div className="mb-4 flex flex-col items-center">
          <div className="relative h-[400px] w-full max-w-4xl bg-teal-50/20 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden flex justify-center items-center">
            <Image
              src={imageUrls[currentImageIndex] || "/placeholder.svg"}
              alt={excursion.name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-[360px] w-auto rounded-lg object-contain"
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

      <div id="booking-bottom" className="text-center mt-6 mb-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/book_tour?id=${excursion.id}`}
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

      <FloatingBookingBar id={excursion.id} />
    </div>
  );
}
