"use client"

import type React from "react"
import { useCallback, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Room {
  id: string
  number: string
  tenantName: string | null
  business: string | null
}

interface FloorPlanProps {
  floor: number
  rooms: Room[]
  onRoomClick: (room: Room) => void
}

const FloorPlan: React.FC<FloorPlanProps> = ({ floor, rooms, onRoomClick }) => {
  const floorName = useMemo(() => {
    switch (floor) {
      case 0:
        return "Подвал"
      case 1:
        return "1 этаж"
      case 2:
        return "2 этаж"
      case 3:
        return "3 этаж"
      default:
        return `${floor} этаж`
    }
  }, [floor])

  const handleRoomClick = useCallback((room: Room) => {
    onRoomClick(room)
  }, [onRoomClick])

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{floorName}</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {rooms.map((room) => (
          <Dialog key={room.id}>
            <DialogTrigger asChild>
              <Button
                variant={room.tenantName ? "default" : "outline"}
                className="h-20 w-full flex flex-col justify-center"
                onClick={() => handleRoomClick(room)}
              >
                <span className="font-medium">{room.number}</span>
                <span className="text-xs text-gray-500">{room.tenantName || "Свободно"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Информация о помещении {room.number}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {room.tenantName ? (
                  <>
                    <p><span className="font-semibold">Арендатор:</span> {room.tenantName}</p>
                    <p><span className="font-semibold">Вид деятельности:</span> {room.business}</p>
                  </>
                ) : (
                  <p className="text-gray-600">Помещение свободно</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default FloorPlan
