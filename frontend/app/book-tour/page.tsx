"use client";

import { useState, useEffect } from "react";

interface Excursion {
  id: number;
  name: string;
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    fetch("/api/excursions")
      .then((res) => res.json())
      .then((data: Excursion[]) => setExcursions(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const isWorkingHours = (date: Date) => {
    const hour = date.getHours();
    return hour >= 9 && hour < 21;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setShowConfirmation(true);
  };

  const confirmAndSend = () => {
    setShowConfirmation(false);

    const excursionName =
      excursions.find((e) => e.id === Number(formData.excursionId))?.name || "—";

    const now = new Date();
    const formattedTime = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const text = `
📌 Новая заявка на экскурсию

🕒 Получена: ${formattedTime}
🌍 Экскурсия: ${excursionName}
👤 Имя: ${formData.name}
📞 Способ связи: ${formData.contactMethod}
🔗 Контакт: ${formData.contactValue}
👪 Взрослые: ${formData.adults}
🧒 Дети: ${formData.children}
👶 Малыши: ${formData.toddlers}
    `.trim();

    fetch("/api/bot/send-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then(() => alert("Заявка успешно отправлена!"))
      .catch(() => alert("Ошибка при отправке заявки."));
  };

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
            <option value="" disabled>Выберите экскурсию</option>
            {excursions.map((tour) => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 flex items-center gap-2">
            Имя
            <span title="Как к Вам обращаться?" className="cursor-help text-blue-600">❔</span>
          </label>
          <input
            type="text"
            name="name"
            required
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

        {[
          {
            label: "Количество взрослых",
            name: "adults",
            tooltip: 'Во Вьетнаме чаще всего зависит от роста: "взрослый" — более 120 см, исключение — экскурсия на остров DoiDep: "взрослый" — 12 лет и более.',
          },
          {
            label: "Количество детей",
            name: "children",
            tooltip: 'Во Вьетнаме чаще всего зависит от роста: "ребёнок" — от 90 до 120 см, исключение — экскурсия на остров DoiDep: "ребёнок" — от 3 до 12 лет.',
          },
          {
            label: "Количество маленьких детей",
            name: "toddlers",
            tooltip: 'Во Вьетнаме чаще всего зависит от роста: "маленький ребёнок" — до 90 см, исключение — экскурсия на остров DoiDep: "маленький ребёнок" — до 3 лет.',
          },
        ].map(({ label, name, tooltip }) => (
          <div key={name}>
            <label className="block mb-1 flex items-center gap-2">
              {label}
              <span title={tooltip} className="cursor-help text-blue-600">❔</span>
            </label>
            <input
              type="number"
              name={name}
              min={0}
              required
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="text-sm text-gray-700 mt-4">
          <p>Рабочие часы: 09:00 - 21:00</p>
          <p>Текущее время: {formatTime(currentTime)}</p>
          <p className="font-medium">
            {isWorkingHours(currentTime)
              ? "Менеджер ответит Вам в ближайшее время"
              : "Менеджер ответит Вам в рабочее время"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Забронировать
        </button>
      </form>

      {showConfirmation && (
        <div className="mt-6 p-4 border rounded bg-yellow-100">
          <h2 className="text-lg font-bold mb-2">Проверьте введённую информацию</h2>
          <p>Если Вы указали неверные контактные данные — мы не сможем с Вами связаться.</p>
          <ul className="mt-2 list-disc list-inside text-sm">
            <li>Экскурсия: {excursions.find((e) => e.id === Number(formData.excursionId))?.name || "—"}</li>
            <li>Имя: {formData.name}</li>
            <li>Связь: {formData.contactMethod} — {formData.contactValue}</li>
            <li>Взрослых: {formData.adults}</li>
            <li>Детей: {formData.children}</li>
            <li>Маленьких детей: {formData.toddlers}</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <button
              onClick={confirmAndSend}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Отправить заявку
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Редактировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
