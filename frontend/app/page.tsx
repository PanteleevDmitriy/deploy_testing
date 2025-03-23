"use client";

import { useState, useEffect } from "react";
import ExcursionCard from "./components/ExcursionCard";
import type { ExcursionInterface } from "@/app/types/excursion";

export default function Home() {
  const [excursions, setExcursions] = useState<ExcursionInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const response = await fetch("/api/excursions");
        const data: ExcursionInterface[] = await response.json();
        setExcursions(data.filter((tour) => tour.isAvailable));
      } catch (error) {
        console.error("Ошибка загрузки экскурсий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExcursions();
  }, []);

  return (
    <div className="pt-28 bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background.png')" }}>
      {/* Блок приветствия */}
      <section className="bg-white/50 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
            Вас приветствует компания SEA Wind travel
          </h1>
          <p className="text-lg sm:text-xl mb-2 text-center">
            С нами ваш отдых будет незабываемым!
          </p>
          <p className="mb-2 text-center">
            Мы предлагаем экскурсии по всем направлениям. Мы гарантируем комфорт и качество. 
            У нас компетентные русские гиды и большой опыт в туризме.
          </p>
        </div>
      </section>

      {/* Блок экскурсий */}
      <section className="py-6">
        <div className="container mx-auto px-4 bg-white/50 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Наши экскурсии</h2>

          {loading ? (
            <div className="text-center py-4">
              <p className="text-xl">Загрузка...</p>
            </div>
          ) : excursions.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xl">Экскурсии не найдены</p>
            </div>
          ) : (
            <div className="space-y-6">
              {excursions.map((excursion) => (
                <div key={excursion.id} className="flex justify-center relative">
                  {excursion.isPopular && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded">
                      Популярное
                    </div>
                  )}
                  <div className="w-full md:w-[70%]">
                    <ExcursionCard excursion={excursion} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
