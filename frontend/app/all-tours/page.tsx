'use client'

import { useState } from 'react'
import TourCard from '../components/TourCard'

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

export default function AllTours() {
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null)

  const handleExpand = (id: number) => {
    setExpandedTourId(expandedTourId === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Все туры</h1>
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
    </div>
  )
}

