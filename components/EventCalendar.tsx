"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

interface Event {
  id: number
  title: string
  date: Date
  type: "payment" | "contract" | "maintenance"
}

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // В реальном приложении эти данные были бы получены из API
  const events: Event[] = [
    { id: 1, title: 'Оплата аренды ООО "ТехноПром"', date: new Date(2024, 2, 15), type: "payment" },
    { id: 2, title: 'Истечение договора с ИП "Иванов"', date: new Date(2024, 3, 1), type: "contract" },
    { id: 3, title: "Плановое обслуживание системы вентиляции", date: new Date(2024, 2, 20), type: "maintenance" },
  ]

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Календарь событий</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">События на {selectedDate?.toLocaleDateString()}</h3>
            {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
              <ul className="space-y-2">
                {getEventsForDate(selectedDate).map((event) => (
                  <li key={event.id} className="flex items-center space-x-2">
                    <Badge
                      variant={
                        event.type === "payment" ? "default" : event.type === "contract" ? "secondary" : "outline"
                      }
                    >
                      {event.type === "payment" ? "Оплата" : event.type === "contract" ? "Договор" : "Обслуживание"}
                    </Badge>
                    <span>{event.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет событий на выбранную дату</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCalendar

