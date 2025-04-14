"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

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
  extraInfo:
    "Вы можете оставить по желанию любую дополнительную информацию со своими пожеланиями",
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
    extraInfo: "",
  });
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const tooltipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const searchParams = useSearchParams();
  const [timestamp, setTimestamp] = useState("");
  const [recaptchaToken, setCaptchaToken] = useState<string | null>(null);

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
    const id = searchParams.get("id");
    if (id) {
      setFormData((prev) => ({ ...prev, excursionId: id }));
    }
  }, [searchParams]);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["adults", "children", "toddlers"].includes(name)
        ? parseInt(value)
        : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateContact = (): boolean => {
    const value = formData.contactValue.trim();
    switch (formData.contactMethod) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "Вьетнамский номер телефона":
        return /^(\+84|0)\d{9,10}$/.test(value);
      default:
        return value.length > 1;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, укажите имя.";
    }
    if (formData.adults < 1) {
      newErrors.adults = "Хотя бы один взрослый должен быть в группе!";
    }
    if (!validateContact()) {
      newErrors.contactValue = "Неверный формат контакта.";
    }
    if (!recaptchaToken) {
      newErrors.captcha = "Пожалуйста, подтвердите, что вы не робот.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const now = new Date();
    setTimestamp(
      now.toLocaleString("ru-RU", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    const selectedTour = excursions.find(
      (ex) => String(ex.id) === formData.excursionId
    );
    const text = `
<b>📩 Новая заявка с сайта</b>
<b>Время заявки:</b> ${timestamp}
<b>Экскурсия:</b> ${selectedTour?.name || "—"}
<b>Имя:</b> ${formData.name}
<b>Способ связи: ${formData.contactMethod}</b>
<b>Контакт:</b> ${formData.contactValue}
<b>Взрослых:</b> ${formData.adults}
<b>Детей:</b> ${formData.children}
<b>Маленьких детей:</b> ${formData.toddlers}
<b>Доп. информация:</b> ${formData.extraInfo || "—"}
    `.trim();

    try {
      await fetch("/api/bot/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          excursionId: formData.excursionId,
          timestamp,
          recaptchaToken, // отправляем капчу на бэкенд
        }),
      });
      alert("Заявка успешно отправлена!");
      setFormData({
        excursionId: "",
        name: "",
        contactMethod: "Telegram",
        contactValue: "",
        adults: 1,
        children: 0,
        toddlers: 0,
        extraInfo: "",
      });
      setCaptchaToken(null);
      setShowConfirmation(false);
    } catch {
      alert("Ошибка при отправке заявки.");
    }
  };

  const renderFieldWithTooltip = (
    label: string,
    name: string,
    type: "text" | "number" | "textarea" = "text"
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
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          maxLength={200}
        />
      ) : (
        <input
          type={type}
          name={name}
          min={type === "number" ? 0 : undefined}
          value={formData[name as keyof typeof formData] as string | number}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      )}
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
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
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
          {errors.contactValue && (
            <p className="mt-1 text-sm text-red-600">{errors.contactValue}</p>
          )}
        </div>

        {renderFieldWithTooltip("Количество взрослых", "adults", "number")}
        {renderFieldWithTooltip("Количество детей", "children", "number")}
        {renderFieldWithTooltip("Количество маленьких детей", "toddlers", "number")}
        {renderFieldWithTooltip("Дополнительная информация (необязательно)", "extraInfo", "textarea")}

        <div className="my-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token: string | null) => {
              if (token) {
                setCaptchaToken(token);
                setErrors((prev) => ({ ...prev, captcha: "" }));
              } else {
                setCaptchaToken(null);
                setErrors((prev) => ({ ...prev, captcha: "Пожалуйста, подтвердите капчу." }));
              }
            }}
            
            onExpired={() => setCaptchaToken(null)}
          />

          {errors.captcha && (
            <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
          )}
        </div>

        <div className="border border-blue-300 bg-blue-50 p-4 rounded text-sm text-blue-900">
          <p><b>Рабочее время с 9:00 до 21:00</b></p>
          <p>Текущее время: {new Date().toLocaleTimeString("ru-RU", { timeZone: "Asia/Ho_Chi_Minh", hour: '2-digit', minute: '2-digit' })}</p>
          <p>Если Вы оставите заявку вне рабочего времени, менеджер ответит в начале рабочего дня.</p>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Отправить заявку
        </button>
      </form>

      {showConfirmation && (
        <div className="mt-6 border border-red-400 bg-white p-6 rounded">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Пожалуйста, внимательно проверьте введённые вами данные перед отправкой заявки!
          </h2>
          <p className="mb-4 text-sm text-red-600">
            Если Вы неверно указали контактную информацию, то мы не сможем с Вами связаться.
          </p>
          <p><b>Время заявки:</b> {timestamp}</p>
          <p><b>Имя:</b> {formData.name}</p>
          <p><b>Контакт ({formData.contactMethod}):</b> {formData.contactValue}</p>
          <p><b>Взрослых:</b> {formData.adults}</p>
          <p><b>Детей:</b> {formData.children}</p>
          <p><b>Маленьких детей:</b> {formData.toddlers}</p>
          {formData.extraInfo && (
            <p><b>Доп. информация:</b> {formData.extraInfo}</p>
          )}
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
