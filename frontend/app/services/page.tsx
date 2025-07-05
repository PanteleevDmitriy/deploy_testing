import Link from 'next/link'

const services = [
  { title: "Проведение фотосессий", description: "Профессиональный фотограф, любая тематика", link: "/photosession" },
  { title: "SIM-карты", description: "Чтобы оставаться на связи и не быть зависимыми от наличия Wi-Fi", link: "/simcard" },
  { title: "Трансфер", description: "Комфортабельный трансфер из аэропорта и по городу", link: "/transfer" },
]

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Наши услуги</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href={service.link}
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/contact" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block">
          Связаться с нами
        </Link>
      </div>
    </div>
  )
}
