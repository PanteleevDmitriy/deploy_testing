export default function TransferPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Трансфер для туристов</h1>

      <div className="flex justify-center mb-8">
        <img
          // src="/images/transfer.jpg"  замени путь, если у тебя другое изображение
          alt="Трансфер Вьетнам"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>

      <p className="text-lg text-gray-700 text-center max-w-xl mx-auto">
        Комфортабельный трансфер из аэропорта и по городу. Встреча с табличкой, помощь с багажом и удобный транспорт по маршруту. Подходит для индивидуальных и групповых поездок.
      </p>
    </div>
  )
}
