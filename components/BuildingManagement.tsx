"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BuildingModel3D from "@/components/BuildingModel3D"
import FloorInfo from "@/components/FloorInfo"
import { useToast } from "@/components/ui/use-toast"
import { buildings as initialBuildings } from "@/utils/mockData"

const BuildingManagement = () => {
  const [buildings, setBuildings] = useState(initialBuildings)
  const [selectedBuilding, setSelectedBuilding] = useState(initialBuildings[0])
  const [selectedFloor, setSelectedFloor] = useState(initialBuildings[0]?.floors[0] || null)
  const [newBuilding, setNewBuilding] = useState({ name: "" })
  const [newRoom, setNewRoom] = useState({ number: "", area: 0 })
  const { toast } = useToast()

  const handleAddBuilding = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!newBuilding.name.trim()) return

      const newBuildingWithId = {
        id: buildings.length + 1,
        name: newBuilding.name,
        floors: [{ number: 1, rooms: [] }], // Добавляем первый этаж
      }

      setBuildings((prev) => [...prev, newBuildingWithId])
      setSelectedBuilding(newBuildingWithId)
      setSelectedFloor(newBuildingWithId.floors[0])
      setNewBuilding({ name: "" })

      toast({
        title: "Успех",
        description: "Здание добавлено успешно.",
      })
    },
    [newBuilding, buildings, toast]
  )

  const handleAddRoom = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!newRoom.number.trim() || newRoom.area <= 0) return

      if (selectedFloor) {
        const newRoomWithId = {
          id: selectedFloor.rooms.length + 1,
          number: newRoom.number,
          area: newRoom.area,
          isOccupied: false,
          tenant: null,
        }

        setBuildings((prev) =>
          prev.map((building) =>
            building.id === selectedBuilding.id
              ? {
                  ...building,
                  floors: building.floors.map((floor) =>
                    floor.number === selectedFloor.number
                      ? { ...floor, rooms: [...floor.rooms, newRoomWithId] }
                      : floor
                  ),
                }
              : building
          )
        )

        setNewRoom({ number: "", area: 0 })

        toast({
          title: "Успех",
          description: "Кабинет добавлен успешно.",
        })
      }
    },
    [newRoom, selectedFloor, selectedBuilding, toast]
  )

  const handleFloorSelect = useCallback((floor: typeof selectedFloor) => {
    setSelectedFloor(floor)
  }, [])

  const memoizedBuildingModel = useMemo(
    () => (
      <BuildingModel3D
        floors={selectedBuilding.floors.map((floor) => ({
          floorNumber: floor.number,
          rooms: floor.rooms.map((room) => ({
            number: room.number,
            tenant: room.tenant || null,
          })),
        }))}
        onFloorSelect={handleFloorSelect}
      />
    ),
    [selectedBuilding, handleFloorSelect]
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Управление зданиями</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить здание</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить новое здание</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBuilding} className="space-y-4">
            <div>
              <Label htmlFor="buildingName">Название здания</Label>
              <Input
                id="buildingName"
                value={newBuilding.name}
                onChange={(e) => setNewBuilding({ name: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Добавить</Button>
          </form>
        </DialogContent>
      </Dialog>

      {selectedBuilding && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedBuilding.name}</CardTitle>
            </CardHeader>
            <CardContent>{memoizedBuildingModel}</CardContent>
          </Card>

          {selectedFloor && (
            <FloorInfo
              floorNumber={selectedFloor.number}
              rooms={selectedFloor.rooms.map((room) => ({
                number: room.number,
                tenant: room.tenant || null,
              }))}
            />
          )}
        </div>
      )}

      {selectedFloor && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedFloor.number} этаж</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Номер кабинета</TableHead>
                  <TableHead>Площадь (м²)</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Арендатор</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedFloor.rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>{room.number}</TableCell>
                    <TableCell>{room.area}</TableCell>
                    <TableCell>{room.isOccupied ? "Занят" : "Свободен"}</TableCell>
                    <TableCell>{room.tenant || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Добавить кабинет</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Добавить новый кабинет</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddRoom} className="space-y-4">
                  <div>
                    <Label htmlFor="roomNumber">Номер кабинета</Label>
                    <Input
                      id="roomNumber"
                      value={newRoom.number}
                      onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="roomArea">Площадь (м²)</Label>
                    <Input
                      id="roomArea"
                      type="number"
                      value={newRoom.area}
                      onChange={(e) => setNewRoom({ ...newRoom, area: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <Button type="submit">Добавить</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default BuildingManagement
