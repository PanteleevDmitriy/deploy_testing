export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8">О нас</h1>
      <p className="mb-4">
        SEAWIND Travel - ваш надежный партнер в путешествиях по Вьетнаму. Мы специализируемся на организации туров в
        городе Нячанг и его окрестностях.
      </p>
      <p className="mb-4">
        Наша команда состоит из опытных профессионалов, которые знают и любят Вьетнам. Мы предлагаем широкий выбор
        экскурсий с русскоговорящими гидами, чтобы вы могли полностью погрузиться в культуру и красоту этой удивительной
        страны.
      </p>
      <p className="mb-8">
        С SEAWIND Travel вы получите незабываемые впечатления и яркие эмоции от путешествия по Вьетнаму!
      </p>

      {/* Видео с Google Диска */}
      <div className="aspect-video w-full max-w-3xl mx-auto">
        <iframe
          src="https://drive.google.com/file/d/1jwcuI1piFQdpuej15gkSZHyPi_jXW79x/preview"
          width="100%"
          height="100%"
          allow="autoplay"
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  )
}
