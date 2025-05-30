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
    <div className="pt-28 pb-28" style={{ backgroundImage: "url('/logo_fon.PNG')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="bg-teal-50/60 backdrop-blur-sm py-4 sm:py-4 rounded-xl mx-2">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
            Вас приветствует компания SEA Wind travel
          </h1>
          <p className="text-lg sm:text-xl mb-2 text-center">
            С нами ваш отдых будет незабываемым!
          </p>
          <p className="mb-2 text-center">
            Мы предлагаем экскурсии по всем направлениям. 
            Мы гарантируем комфорт и качество. 
            У нас компетентные русские гиды 
            и большой опыт в туризме.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
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
            <div className="flex flex-col gap-6">
              {[...excursions]
                .sort((a, b) => a.id - b.id)
                .map((excursion) => (
                  <ExcursionCard key={excursion.id} excursion={excursion} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
