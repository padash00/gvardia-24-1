"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface AccessCard {
  id: number
  cardNumber: string
  assignedTo: string
  accessLevel: "Базовый" | "Расширенный" | "Полный"
  isActive: boolean
}

const AccessControlSystem: React.FC = () => {
  const [accessCards, setAccessCards] = useState<AccessCard[]>([
    { id: 1, cardNumber: "AC001", assignedTo: "Иван Петров", accessLevel: "Базовый", isActive: true },
    { id: 2, cardNumber: "AC002", assignedTo: "Мария Сидорова", accessLevel: "Расширенный", isActive: true },
    { id: 3, cardNumber: "AC003", assignedTo: "Алексей Иванов", accessLevel: "Полный", isActive: true },
  ])

  const [newCard, setNewCard] = useState<Partial<AccessCard>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard({ ...newCard, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCard({ ...newCard, [name]: value })
  }

  const addCard = () => {
    if (newCard.cardNumber && newCard.assignedTo && newCard.accessLevel) {
      setAccessCards([...accessCards, { id: accessCards.length + 1, ...(newCard as AccessCard), isActive: true }])
      setNewCard({})
    }
  }

  const toggleCardStatus = (id: number) => {
    setAccessCards(accessCards.map((card) => (card.id === id ? { ...card, isActive: !card.isActive } : card)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Система контроля доступа</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Добавить карту доступа</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая карта доступа</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">
                  Номер карты
                </Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={newCard.cardNumber || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignedTo" className="text-right">
                  Владелец
                </Label>
                <Input
                  id="assignedTo"
                  name="assignedTo"
                  value={newCard.assignedTo || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accessLevel" className="text-right">
                  Уровень доступа
                </Label>
                <Select onValueChange={(value) => handleSelectChange("accessLevel", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите уровень доступа" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Базовый">Базовый</SelectItem>
                    <SelectItem value="Расширенный">Расширенный</SelectItem>
                    <SelectItem value="Полный">Полный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addCard}>Добавить карту</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер карты</TableHead>
              <TableHead>Владелец</TableHead>
              <TableHead>Уровень доступа</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessCards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.cardNumber}</TableCell>
                <TableCell>{card.assignedTo}</TableCell>
                <TableCell>{card.accessLevel}</TableCell>
                <TableCell>{card.isActive ? "Активна" : "Неактивна"}</TableCell>
                <TableCell>
                  <Switch checked={card.isActive} onCheckedChange={() => toggleCardStatus(card.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AccessControlSystem

