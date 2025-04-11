"use client";

import { useState, useEffect, useRef } from "react";

interface Excursion {
  id: number;
  name: string;
}

function TooltipIcon({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="ml-2 text-blue-500"
      >
        ❔
      </button>
      {visible && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-72 bg-gray-800 text-white text-sm px-3 py-2 rounded shadow z-10">
          {text}
        </div>
      )}
    </div>
  );
}

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

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: Excursion[]) => setExcursions(data.filter((e) => e.id > 0)));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="max-w-xl mx-auto mt-10 space-y-4">
      <div>
        <label className="block mb-1">Выбор экскурсии</label>
        <select
          name="excursionId"
          value={formData.excursionId}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Выберите экскурсию</option>
          {excursions.map((exc) => (
            <option key={exc.id} value={exc.id}>
              {exc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center mb-1">
          Имя
          <TooltipIcon text="Как к Вам обращаться?" />
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Как с Вами связаться</label>
        <select
          name="contactMethod"
          value={formData.contactMethod}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
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
          value={formData.contactValue}
          onChange={handleChange}
          placeholder="Введите контакт"
          className="w-full border px-3 py-2 rounded mt-2"
        />
      </div>

      <div>
        <label className="flex items-center mb-1">
          Количество взрослых
          <TooltipIcon text='Во Вьетнаме чаще всего зависит от роста: "взрослый" — более 120 см, исключение — экскурсия на остров DoiDep: "взрослый" — 12 лет и более.' />
        </label>
        <input
          type="number"
          name="adults"
          value={formData.adults}
          onChange={handleChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="flex items-center mb-1">
          Количество детей
          <TooltipIcon text='Во Вьетнаме чаще всего зависит от роста: "ребёнок" — от 90 до 120 см, исключение — экскурсия на остров DoiDep: "ребёнок" — от 3 до 12 лет.' />
        </label>
        <input
          type="number"
          name="children"
          value={formData.children}
          onChange={handleChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="flex items-center mb-1">
          Количество маленьких детей
          <TooltipIcon text='Во Вьетнаме чаще всего зависит от роста: "маленький ребёнок" — до 90 см, исключение — экскурсия на остров DoiDep: "маленький ребёнок" — до 3 лет.' />
        </label>
        <input
          type="number"
          name="toddlers"
          value={formData.toddlers}
          onChange={handleChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Забронировать
      </button>
    </form>
  );
}
