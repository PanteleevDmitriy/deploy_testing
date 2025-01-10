import Link from 'next/link'

const services = [
  { title: "Обмен валюты", description: "Выгодный обмен валюты для наших клиентов" },
  { title: "Симкарты", description: "Продажа и активация местных SIM-карт" },
  { title: "Трансфер", description: "Комфортабельный трансфер из/в аэропорт и по городу" },
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
              <p className="text-gray-600">{service.description}</p>
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

