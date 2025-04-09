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

      {/* YouTube Shorts вертикальное видео */}
      <div className="w-full max-w-sm mx-auto aspect-[9/16]">
        <iframe
          src="https://www.youtube.com/embed/Thlpp5LOdKA"
          title="YouTube Shorts"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  )
}
