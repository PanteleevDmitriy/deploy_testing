
export default function SimcardPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Туристическая SIM-карта</h1>

      <div className="flex justify-center mb-8">
        <img

          //src="/images/simcard.jpg"  заменишь путь, если другое изображение
          alt="SIM-карта Вьетнам"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      <p className="text-lg text-gray-700 text-center max-w-xl mx-auto">
        Удобная туристическая SIM-карта для отдыхающих во Вьетнаме. Срок действия — 14 дней. Подключение интернета без необходимости искать Wi-Fi.
      </p>
    </div>
  )
}
