"use client";

import { useEffect, useRef, useState } from "react";

interface Excursion {
  id: number;
  name: string;
}

const tooltips = {
  name: "Как к Вам обращаться?",
  adults:
    'Во Вьетнаме чаще всего зависит от роста: "взрослый" — более 120 см, исключение — экскурсия на остров DoiDep: "взрослый" — 12 лет и более.',
  children:
    'Во Вьетнаме чаще всего зависит от роста: "ребёнок" — от 90 до 120 см, исключение — экскурсия на остров DoiDep: "ребёнок" — от 3 до 12 лет.',
  toddlers:
    'Во Вьетнаме чаще всего зависит от роста: "маленький ребёнок" — до 90 см, исключение — экскурсия на остров DoiDep: "маленький ребёнок" — до 3 лет.',
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
  const [contactError, setContactError] = useState("");
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: Excursion[]) =>
        setExcursions(data.filter((e) => e.id >= 100))
      )
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setTooltipOpen(null);
      }
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
        setContactError(isValid ? "" : "Введите корректный email.");
        break;
      case "Вьетнамский номер телефона":
        isValid = /^(\+84|0)\d{9,10}$/.test(value);
        setContactError(isValid ? "" : "Введите корректный вьетнамский номер.");
        break;
      default:
        isValid = value.length > 1;
        setContactError(isValid ? "" : "Поле не должно быть пустым.");
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    alert("Форма успешно проверена. Отправка заявки...");
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
          onClick={() => setTooltipOpen((prev) => (prev === name ? null : name))}
          className="text-blue-600 cursor-pointer text-lg"
        >
          ❔
        </button>
      </label>
      <input
        type={type}
        name={name}
        min={type === "number" ? 0 : undefined}
        required
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      {tooltipOpen === name && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-1 left-0 bg-white text-sm border p-2 rounded shadow-md z-10 w-full"
        >
          {tooltips[name as keyof typeof tooltips]}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16 pt-24 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Забронировать тур</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Выбор экскурсии</label>
          <select
            name="excursionId"
            value={formData.excursionId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
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
          <label className="block mb-1">Как с Вами связаться</label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mb-2"
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
            className="w-full border px-3 py-2 rounded"
          />
          {contactError && (
            <p className="text-red-500 text-sm mt-1">{contactError}</p>
          )}
        </div>

        {renderFieldWithTooltip("Количество взрослых", "adults", "number")}
        {renderFieldWithTooltip("Количество детей", "children", "number")}
        {renderFieldWithTooltip(
          "Количество маленьких детей",
          "toddlers",
          "number"
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}
