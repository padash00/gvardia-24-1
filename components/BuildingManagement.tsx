"use client"

import React, { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

import BuildingModel3D from "@/components/BuildingModel3D"
import FloorInfo from "@/components/FloorInfo"
import AddBuildingForm from "./AddBuildingForm"
import AddRoomForm from "./AddRoomForm"

import { buildings as initialBuildings } from "@/utils/mockData"

// Пример интерфейсов (TypeScript)
interface Room {
  id: string
  number: string
  area: number
  isOccupied: boolean
  tenant: string | null
}

interface Floor {
  number: number
  rooms: Room[]
}

interface Building {
  id: string
  name: string
  floors: Floor[]
}

const BuildingManagement: React.FC = () => {
  const { toast } = useToast()

  const [buildings, setBuildings] = useState<Building[]>(initialBuildings)
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(initialBuildings[0] || null)
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(
    initialBuildings[0]?.floors[0] || null
  )

  /**
   * Обработчик добавления нового здания.
   * Формирует здание, добавляет в общий список и выделяет его.
   */
  const handleAddBuilding = useCallback(
    (newBuildingName: string) => {
      if (!newBuildingName.trim()) return

      // Генерируем уникальный идентификатор (например, через uuid или nanoid)
      const newBuildingId = crypto.randomUUID()

      const newBuilding: Building = {
        id: newBuildingId,
        name: newBuildingName,
        // По умолчанию создаём один пустой этаж
        floors: [
          {
            number: 1,
            rooms: [],
          },
        ],
      }

      setBuildings((prev) => [...prev, newBuilding])
      setSelectedBuilding(newBuilding)
      setSelectedFloor(newBuilding.floors[0])

      toast({
        title: "Успех",
        description: `Здание "${newBuildingName}" добавлено успешно.`,
      })
    },
    [toast]
  )

  /**
   * Обработчик добавления нового кабинета.
   * Добавляет новый кабинет на текущий этаж выделенного здания.
   */
  const handleAddRoom = useCallback(
    (roomNumber: string, roomArea: number) => {
      if (!roomNumber.trim() || roomArea <= 0 || !selectedFloor || !selectedBuilding) return

      const newRoom: Room = {
        id: crypto.randomUUID(),
        number: roomNumber,
        area: roomArea,
        isOccupied: false,
        tenant: null,
      }

      // Обновляем конкретный этаж конкретного здания
      setBuildings((prev) =>
        prev.map((building) => {
          if (building.id === selectedBuilding.id) {
            return {
              ...building,
              floors: building.floors.map((floor) => {
                if (floor.number === selectedFloor.number) {
                  return {
                    ...floor,
                    rooms: [...floor.rooms, newRoom],
                  }
                }
                return floor
              }),
            }
          }
          return building
        })
      )

      toast({
        title: "Успех",
        description: `Кабинет №${roomNumber} добавлен успешно.`,
      })
    },
    [selectedBuilding, selectedFloor, toast]
  )

  /**
   * Выбор этажа в модели здания.
   */
  const handleFloorSelect = useCallback((floorNumber: number) => {
    if (!selectedBuilding) return
    const floor = selectedBuilding.floors.find((f) => f.number === floorNumber) || null
    setSelectedFloor(floor)
  }, [selectedBuilding])

  /**
   * Обёртка для 3D-модели здания, чтобы не пересоздавать компонент слишком часто
   */
  const memoizedBuildingModel = useMemo(() => {
    if (!selectedBuilding) return null

    // Преобразуем структуру для BuildingModel3D
    const floors = selectedBuilding.floors.map((floor) => ({
      floorNumber: floor.number,
      rooms: floor.rooms.map((room) => ({
        number: room.number,
        tenant: room.tenant || null,
      })),
    }))

    return <BuildingModel3D floors={floors} onFloorSelect={handleFloorSelect} />
  }, [selectedBuilding, handleFloorSelect])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-2">Управление зданиями</h2>

      {/* Кнопка добавления нового здания */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить здание</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить новое здание</DialogTitle>
          </DialogHeader>

          {/* Форма вынесена в отдельный компонент AddBuildingForm */}
          <AddBuildingForm onAddBuilding={handleAddBuilding} />
        </DialogContent>
      </Dialog>

      {/* Выбранное здание и этаж */}
      {selectedBuilding && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedBuilding.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* 3D-модель здания (этажи) */}
              {memoizedBuildingModel}
            </CardContent>
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

      {/* Информация о текущем этаже и кабинетах */}
      {selectedBuilding && selectedFloor && (
        <Card>
          <CardHeader>
            <CardTitle>{`Этаж №${selectedFloor.number}`}</CardTitle>
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

            {/* Добавление кабинета */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Добавить кабинет</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Добавить новый кабинет</DialogTitle>
                </DialogHeader>

                {/* Форма вынесена в отдельный компонент AddRoomForm */}
                <AddRoomForm onAddRoom={handleAddRoom} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default BuildingManagement
