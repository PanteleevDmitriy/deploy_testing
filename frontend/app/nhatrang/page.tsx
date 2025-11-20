"use client";

import { useState, useEffect } from "react";
import ExcursionCard from "@/app/components/ExcursionCard";
import type { ExcursionInterface } from "@/app/types/excursion";


export default function NhaTrangPage() {
const [excursions, setExcursions] = useState<ExcursionInterface[]>([]);
const [loading, setLoading] = useState<boolean>(true);


useEffect(() => {
const fetchExcursions = async () => {
try {
const response = await fetch("/api/excursions");
const data: ExcursionInterface[] = await response.json();
setExcursions(data.filter((tour) => String(tour.id).startsWith("1") && tour.isAvailable));
} catch (error) {
console.error("Ошибка загрузки экскурсий:", error);
} finally {
setLoading(false);
}
};


fetchExcursions();
}, []);


return (
<div className="pt-28">
<section className="py-4 sm:py-4 rounded-xl mx-2">
<div className="container mx-auto px-4">
<h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
Наши экскурсии в городе Нячанг
</h1>
</div>
</section>


<div className="h-20" />


<section className="py-6">
<div className="container mx-auto px-4">
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