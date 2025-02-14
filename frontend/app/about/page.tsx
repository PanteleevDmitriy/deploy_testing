"use client";

import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8">О нас</h1>
      <div className="mb-8 flex justify-center">
        <video
          className="w-full max-w-sm mx-auto rounded-lg shadow-lg cursor-pointer"
          autoPlay
          loop
          muted
          playsInline
          onClick={() => router.push('/tours')}
        >
          <source src="/video/dalat1.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео тег.
        </video>
      </div>
      <p className="mb-4">
        SEAWIND Travel - ваш надежный партнер в путешествиях по Вьетнаму. Мы специализируемся на организации туров в
        городе Нячанг и его окрестностях.
      </p>
      <p className="mb-4">
        Наша команда состоит из опытных профессионалов, которые знают и любят Вьетнам. Мы предлагаем широкий выбор
        экскурсий с русскоговорящими гидами, чтобы вы могли полностью погрузиться в культуру и красоту этой удивительной
        страны.
      </p>
      <p>С SEAWIND Travel вы получите незабываемые впечатления и яркие эмоции от путешествия по Вьетнаму!</p>
    </div>
  );
}
