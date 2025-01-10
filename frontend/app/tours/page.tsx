'use client'

import { useState, useEffect } from 'react'
import TourCard from '../components/TourCard'
import { tours } from '../data/tours'

export default function Tours() {
  const [expandedTourId, setExpandedTourId] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExpand = (id: number) => {
    setExpandedTourId(expandedTourId === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-32">
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

