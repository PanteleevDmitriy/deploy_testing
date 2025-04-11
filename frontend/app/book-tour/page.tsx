"use client";

import { useEffect, useRef, useState } from "react";

interface Excursion {
  id: number;
  name: string;
}

const tooltips = {
  name: "Как к Вам обращаться?",
  adults:
    'Во Вьетнаме чаще всего зависит от роста: "взрослый" — более 120см, исключение — экскурсия на остров DoiDep: "взрослый" — 12 лет и более.',
  children:
    'Во Вьетнаме чаще всего зависит от роста: "ребёнок" — от 90см до 120см, исключение — экскурсия на остров DoiDep: "ребёнок" — от 3-х до 12-ти лет.',
  toddlers:
    'Во Вьетнаме чаще всего зависит от роста: "маленький ребёнок" — до 90см, исключение — экскурсия на остров DoiDep: "маленький ребёнок" — до 3-х лет.',
};

export default function BookTour() {
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [formData, setFormData] = useState({
    excursionId: "",
    name: "",
    contactMethod: "Telegram",
    contactValue: "",
    adults: 1,
    children: 0,
    toddlers: 0,
  });
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);
  const tooltipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: Excursion[]) => {
        const filtered = data
          .filter((e) => String(e.id).startsWith("1"))
          .sort((a, b) => a.id - b.id);
        setExcursions(filtered);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedInsideTooltip = Object.values(tooltipRefs.current).some(
        (ref) => ref && ref.contains(e.target as Node)
      );
      if (!clickedInsideTooltip) setTooltipOpen(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateContact = (): boolean => {
    const value = formData.contactValue.trim();
    let isValid = true;

    switch (formData.contactMethod) {
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case "Вьетнамский номер телефона":
        isValid = /^(\+84|0)\d{9,10}$/.test(value);
        break;
      default:
        isValid = value.length > 1;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    const selectedTour = excursions.find(
      (ex) => String(ex.id) === formData.excursionId
    );

    const text = `
<b>📩 Новая заявка с сайта</b>
<b>Экскурсия:</b> ${selectedTour?.name || "—"}
<b>Имя:</b> ${formData.name}
<b>Контакт (${formData.contactMethod}):</b> ${formData.contactValue}
<b>Взрослых:</b> ${formData.adults}
<b>Детей:</b> ${formData.children}
<b>Маленьких детей:</b> ${formData.toddlers}
    `.trim();

    fetch("/api/bot/send-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then(() => {
        alert("Заявка успешно отправлена!");
      })
      .catch(() => {
        alert("Ошибка при отправке заявки.");
      });
  };

  const renderFieldWithTooltip = (
    label: string,
    name: string,
    type: "text" | "number"
  ) => (
    <div className="relative mb-4">
      <label className="block mb-1 flex items-center gap-2">
        {label}
        <button
          type="button"
          className="text-blue-500 cursor-pointer text-xl leading-none"
          onClick={() =>
            setTooltipOpen((prev) => (prev === name ? null : name))
          }
        >
          ℹ️
        </button>
      </label>
      <input
        type={type}
        name={name}
        min={type === "number" ? 0 : undefined}
        required
        value={formData[name as keyof typeof formData] as string | number}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      {tooltipOpen === name && (
        <div
          ref={(el) => {
            if (el) tooltipRefs.current[name] = el;
          }}
          className="absolute top-full left-0 z-20 mt-1 w-full rounded border bg-white p-2 text-sm shadow-md"
        >
          {tooltips[name as keyof typeof tooltips]}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto max-w-xl px-4 py-24">
      <h1 className="mb-6 text-3xl font-bold">Забронировать тур</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Выбор экскурсии</label>
          <select
            name="excursionId"
            value={formData.excursionId}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2"
          >
            <option value="" disabled>
              Выберите экскурсию
            </option>
            {excursions.map((tour) => (
              <option key={tour.id} value={tour.id}>
                {tour.name}
              </option>
            ))}
          </select>
        </div>

        {renderFieldWithTooltip("Имя", "name", "text")}

        <div>
          <label className="mb-1 block">Как с Вами связаться</label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className="mb-2 w-full rounded border px-3 py-2"
          >
            <option>Telegram</option>
            <option>Whatsapp</option>
            <option>Zalo</option>
            <option>email</option>
            <option>Вьетнамский номер телефона</option>
          </select>
          <input
            type="text"
            name="contactValue"
            required
            value={formData.contactValue}
            onChange={handleChange}
            placeholder="Введите контакт"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {renderFieldWithTooltip("Количество взрослых", "adults", "number")}
        {renderFieldWithTooltip("Количество детей", "children", "number")}
        {renderFieldWithTooltip("Количество маленьких детей", "toddlers", "number")}

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}
