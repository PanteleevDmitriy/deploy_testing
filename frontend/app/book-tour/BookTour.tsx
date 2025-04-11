"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  additionalInfo: "Вы можете оставить по желанию любую дополнительную информацию со своими пожеланиями.",
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
    additionalInfo: "",
  });
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const tooltipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("id");

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
    if (preselectedId) {
      setFormData((prev) => ({ ...prev, excursionId: preselectedId }));
    }
  }, [preselectedId]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "adults" || name === "children" || name === "toddlers"
          ? parseInt(value)
          : value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    if (formData.adults < 1) {
      setTooltipOpen("adults");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    const selectedTour = excursions.find(
      (ex) => String(ex.id) === formData.excursionId
    );

    const now = new Date();
    const timestamp = now.toLocaleString("ru-RU", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const text = `
<b>📩 Новая заявка с сайта</b>
<b>Время заявки:</b> ${timestamp}
<b>Экскурсия:</b> ${selectedTour?.name || "—"}
<b>Имя:</b> ${formData.name}
<b>Способ связи ${formData.contactMethod}</b> 
<b>Контакт для связи ${formData.contactValue}</b>
<b>Взрослых:</b> ${formData.adults}
<b>Детей:</b> ${formData.children}
<b>Маленьких детей:</b> ${formData.toddlers}
<b>Доп. информация:</b> ${formData.additionalInfo || "—"}
    `.trim();

    try {
      await fetch("/api/bot/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      alert("Заявка успешно отправлена!");
      setShowConfirmation(false);
    } catch {
      alert("Ошибка при отправке заявки.");
    }
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
        required={name !== "additionalInfo"}
        maxLength={name === "additionalInfo" ? 200 : undefined}
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
        {renderFieldWithTooltip("Дополнительная информация", "additionalInfo", "text")}

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Продолжить
        </button>
      </form>

      {showConfirmation && (
        <div className="mt-6 border-t pt-6 bg-white border-red-500 border-2 p-4 rounded">
          <h2 className="mb-4 text-xl font-semibold">Подтвердите заявку</h2>
          <p><b>Имя:</b> {formData.name}</p>
          <p><b>Контакт ({formData.contactMethod}):</b> {formData.contactValue}</p>
          <p><b>Взрослых:</b> {formData.adults}</p>
          <p><b>Детей:</b> {formData.children}</p>
          <p><b>Маленьких детей:</b> {formData.toddlers}</p>
          {formData.additionalInfo && <p><b>Доп. информация:</b> {formData.additionalInfo}</p>}
          <div className="mt-4 flex gap-4">
            <button
              onClick={confirmSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Подтвердить и отправить
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}