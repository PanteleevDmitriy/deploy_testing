'use client'

import { useState } from 'react'
import Image from 'next/image'
import TourCard from './components/TourCard'
import Link from 'next/link'

const dalatImages = [
  "https://sun9-78.userapi.com/impg/WWtWzX5zqmE0YL2X4EMnUr5fNe7UbLqhUJKWWg/aUpaJ0REu5Q.jpg?size=1440x1085&quality=96&sign=14bbcdda6c16d17af28e762ab6326e18&type=album",
  "https://sun9-37.userapi.com/impg/CfizM5DSjP-YJg3As-_cUdZy7G-zpbS4LVPn5Q/JkpCpkuZU5M.jpg?size=1620x2160&quality=96&sign=046a39b1afe8c9770ab8ff39c96cd65f&type=album",
  "https://sun9-78.userapi.com/impg/WgTUc0aAJNvTZsgUDsUXUb_QqRL5qU_0RkIY-w/j4G-aYUwuVU.jpg?size=1620x2160&quality=96&sign=a347a46be674a6fb6cf47275ef9f9b5a&type=album",
  "https://sun6-23.userapi.com/impg/1tzwRrIYlnDEXkWbqGw0XGhA8jW0P78RDA03_w/ZnHU2jQ-uVQ.jpg?size=1620x2160&quality=96&sign=97e7024d5e285ce3a655c3e4bb54942f&type=album",
  "https://sun9-61.userapi.com/impg/gKDNlNypWYDW-eUDbuNBAU4Rr2-B0xbmb30-dg/NiID1-vMjyU.jpg?size=1440x1800&quality=96&sign=bc81fe4c08831cc7f3bf651eb4546af1&type=album",
  "https://sun9-43.userapi.com/impg/Pxecs_CHwdaQuaaqJtciT_3N8VA8kcOxMLA1zQ/qdN82rMtymE.jpg?size=1440x1085&quality=96&sign=149b38359b90f6aded93ee261740cbfd&type=album",
  "https://sun9-20.userapi.com/impg/ljy6Ukmf0L9SyMB6uty8YMrS8jAM5PxBVSPA_A/-2I-pl50Qfg.jpg?size=1620x2160&quality=96&sign=82566467b83de4fec1f38080d795b946&type=album"
]

const tours = [
  { id: 1, title: "Далат", description: "Экскурсия в город цветов и прохлады", price: 80, images: dalatImages },
  { id: 2, title: "Северные острова", description: "Путешествие по живописным островам", price: 70, images: dalatImages },
  { id: 3, title: "Фанранг", description: "Знакомство с древней столицей Чамского королевства", price: 65, images: dalatImages },
  { id: 4, title: "Дананг", description: "Экскурсия в современный город-курорт", price: 90, images: dalatImages },
  { id: 5, title: "Обзорная экскурсия по г. Нячанг", description: "Знакомство с основными достопримечательностями города", price: 50, images: dalatImages },
  { id: 6, title: "Тур № 7", description: "Специальный тур с уникальной программой", price: 100, images: dalatImages },
]

export default function Home() {
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null)

  const handleExpand = (id: number) => {
    setExpandedTourId(expandedTourId === id ? null : id)
  }

  return (
    <div className="pt-16">
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Экскурсии по Вьетнаму<br />
              город Нячанг
            </h1>
            <p className="text-xl mb-4">Добро пожаловать на сайт компании SEAWIND!</p>
            <p className="mb-4">Мы проводим экскурсии по всем направлениям, у нас русские гиды и огромный опыт в туризме.</p>
            <Link href="/all-tours" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 inline-block">
              Подобрать тур
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="https://psv4.userapi.com/s/v1/d/YR8cNgC8nAY5n_Xv2jQZd41-Kw7eK41gBksJKHN2tqdXzhAAVVC9NfgaCRO899UjnMQO4rHyLx3cUNYIqUIy-rUl-HVWqNelKv4JWHOXaOFP27LsPvix5A/logoz.jpg" 
              alt="SEAWIND travel Logo" 
              width={300} 
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Популярные туры</h2>
          <div className="space-y-8">
            {tours.map((tour) => (
              <div key={tour.id} className="flex justify-center">
                <div className="w-full md:w-[70%]">
                  <TourCard 
                    id={tour.id}
                    title={tour.title} 
                    description={tour.description} 
                    price={tour.price} 
                    images={tour.images}
                    onExpand={handleExpand}
                    isExpanded={expandedTourId === tour.id}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/all-tours" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
              Все туры
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

