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
import { tenants } from "@/utils/mockData"

interface Discount {
  id: number
  tenantId: number
  type: "Скидка" | "Бонус"
  description: string
  value: number
  startDate: string
  endDate: string
}

const DiscountBonusSystem: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      tenantId: 1,
      type: "Скидка",
      description: "Скидка за долгосрочную аренду",
      value: 10,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    {
      id: 2,
      tenantId: 2,
      type: "Бонус",
      description: "Бонус за своевременную оплату",
      value: 5,
      startDate: "2024-03-01",
      endDate: "2024-05-31",
    },
  ])

  const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDiscount({ ...newDiscount, [name]: name === "value" ? Number.parseFloat(value) : value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewDiscount({ ...newDiscount, [name]: value })
  }

  const handleAddDiscount = () => {
    if (
      newDiscount.tenantId &&
      newDiscount.type &&
      newDiscount.description &&
      newDiscount.value &&
      newDiscount.startDate &&
      newDiscount.endDate
    ) {
      setDiscounts([...discounts, { id: discounts.length + 1, ...(newDiscount as Discount) }])
      setNewDiscount({})
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Система скидок и бонусов</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Добавить скидку/бонус</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая скидка/бонус</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenantId" className="text-right">
                  Арендатор
                </Label>
                <Select onValueChange={(value) => handleSelectChange("tenantId", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите арендатора" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id.toString()}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Тип
                </Label>
                <Select onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Скидка">Скидка</SelectItem>
                    <SelectItem value="Бонус">Бонус</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newDiscount.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Значение (%)
                </Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  value={newDiscount.value || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Дата начала
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newDiscount.startDate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Дата окончания
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newDiscount.endDate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddDiscount}>Добавить</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Арендатор</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Значение (%)</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата окончания</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell>{tenants.find((t) => t.id === discount.tenantId)?.name}</TableCell>
                <TableCell>{discount.type}</TableCell>
                <TableCell>{discount.description}</TableCell>
                <TableCell>{discount.value}%</TableCell>
                <TableCell>{discount.startDate}</TableCell>
                <TableCell>{discount.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default DiscountBonusSystem

