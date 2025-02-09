"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { tenants, buildings } from "@/utils/mockData"

const ContractCreation: React.FC = () => {
  const [contract, setContract] = useState({
    tenantId: "",
    buildingId: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    terms: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContract((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setContract((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // В реальном приложении здесь был бы код для сохранения договора
    console.log("Договор создан:", contract)
    alert("Договор успешно создан")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создание договора аренды</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tenantId">Арендатор</Label>
            <Select name="tenantId" onValueChange={(value) => handleSelectChange("tenantId", value)}>
              <SelectTrigger>
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
          <div>
            <Label htmlFor="buildingId">Здание</Label>
            <Select name="buildingId" onValueChange={(value) => handleSelectChange("buildingId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите здание" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id.toString()}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="roomNumber">Номер помещения</Label>
            <Input id="roomNumber" name="roomNumber" value={contract.roomNumber} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="startDate">Дата начала аренды</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={contract.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="endDate">Дата окончания аренды</Label>
            <Input id="endDate" name="endDate" type="date" value={contract.endDate} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="rentAmount">Сумма аренды</Label>
            <Input
              id="rentAmount"
              name="rentAmount"
              type="number"
              value={contract.rentAmount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="terms">Дополнительные условия</Label>
            <Textarea id="terms" name="terms" value={contract.terms} onChange={handleInputChange} />
          </div>
          <Button type="submit">Создать договор</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContractCreation

