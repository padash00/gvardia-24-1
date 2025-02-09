"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Room {
  number: string
  tenant: string | null
}

interface FloorInfoProps {
  floorNumber: number
  rooms: Room[]
}

const FloorInfo: React.FC<FloorInfoProps> = ({ floorNumber, rooms }) => {
  const formattedFloor = useMemo(() => {
    switch (floorNumber) {
      case 0:
        return "Подвал"
      case 1:
        return "1 этаж"
      case 2:
        return "2 этаж"
      case 3:
        return "3 этаж"
      default:
        return `${floorNumber} этаж`
    }
  }, [floorNumber])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о {formattedFloor}</CardTitle>
      </CardHeader>
      <CardContent>
        {rooms.length > 0 ? (
          <ul className="space-y-2">
            {rooms.map((room) => (
              <li key={room.number} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Кабинет {room.number}</span>
                <span className={room.tenant ? "text-red-600" : "text-green-600"}>
                  {room.tenant ? room.tenant : "Свободно"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Нет кабинетов на этом этаже</p>
        )}
      </CardContent>
    </Card>
  )
}

export default FloorInfo
