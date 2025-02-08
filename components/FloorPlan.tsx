import type React from "react"
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
  const getFloorName = (floor: number) => {
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
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{getFloorName(floor)}</h3>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Dialog key={room.id}>
            <DialogTrigger asChild>
              <Button
                variant={room.tenantName ? "default" : "outline"}
                className="h-20 w-full"
                onClick={() => onRoomClick(room)}
              >
                <div>
                  <div>{room.number}</div>
                  <div className="text-xs">{room.tenantName || "Свободно"}</div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Информация о помещении {room.number}</DialogTitle>
              </DialogHeader>
              <div>
                {room.tenantName ? (
                  <>
                    <p>Арендатор: {room.tenantName}</p>
                    <p>Вид деятельности: {room.business}</p>
                  </>
                ) : (
                  <p>Помещение свободно</p>
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

