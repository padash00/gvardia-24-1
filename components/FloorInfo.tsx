import type React from "react"
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о {floorNumber} этаже</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.number} className="flex justify-between items-center">
              <span>Кабинет {room.number}</span>
              <span>{room.tenant ? room.tenant : "Свободно"}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default FloorInfo

