"use client"
import React, { useState, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface AddRoomFormProps {
  /** Вызывается при сабмите формы: передаёт номер кабинета и его площадь */
  onAddRoom: (roomNumber: string, roomArea: number) => void
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onAddRoom }) => {
  const [roomNumber, setRoomNumber] = useState("")
  const [roomArea, setRoomArea] = useState<number>(0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (roomNumber.trim() && roomArea > 0) {
      onAddRoom(roomNumber.trim(), roomArea)
      setRoomNumber("")
      setRoomArea(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="roomNumber">Номер кабинета</Label>
        <Input
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="roomArea">Площадь (м²)</Label>
        <Input
          id="roomArea"
          type="number"
          value={roomArea}
          onChange={(e) => setRoomArea(Number(e.target.value))}
          required
        />
      </div>
      <Button type="submit">Добавить</Button>
    </form>
  )
}

export default AddRoomForm
