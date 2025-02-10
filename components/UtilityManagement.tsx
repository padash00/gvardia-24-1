"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface UtilityReading {
  id: number
  date: string
  electricityUsage: number
  waterUsage: number
  gasUsage: number
}

const UtilityManagement: React.FC = () => {
  const [utilityReadings, setUtilityReadings] = useState<UtilityReading[]>([
    { id: 1, date: "2024-01", electricityUsage: 5000, waterUsage: 200, gasUsage: 100 },
    { id: 2, date: "2024-02", electricityUsage: 5200, waterUsage: 210, gasUsage: 110 },
    { id: 3, date: "2024-03", electricityUsage: 4800, waterUsage: 190, gasUsage: 95 },
  ])

  const [newReading, setNewReading] = useState<Partial<UtilityReading>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewReading({ ...newReading, [name]: name === "date" ? value : Number(value) })
  }

  const addReading = () => {
    if (newReading.date && newReading.electricityUsage && newReading.waterUsage && newReading.gasUsage) {
      setUtilityReadings([...utilityReadings, { id: utilityReadings.length + 1, ...(newReading as UtilityReading) }])
      setNewReading({})
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление коммунальными услугами</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Добавить показания</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новые показания</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Дата
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="month"
                  value={newReading.date || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="electricityUsage" className="text-right">
                  Электричество (кВт⋅ч)
                </Label>
                <Input
                  id="electricityUsage"
                  name="electricityUsage"
                  type="number"
                  value={newReading.electricityUsage || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="waterUsage" className="text-right">
                  Вода (м³)
                </Label>
                <Input
                  id="waterUsage"
                  name="waterUsage"
                  type="number"
                  value={newReading.waterUsage || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gasUsage" className="text-right">
                  Газ (м³)
                </Label>
                <Input
                  id="gasUsage"
                  name="gasUsage"
                  type="number"
                  value={newReading.gasUsage || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addReading}>Добавить показания</Button>
          </DialogContent>
        </Dialog>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={utilityReadings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="electricityUsage"
              stroke="#8884d8"
              name="Электричество (кВт⋅ч)"
            />
            <Line yAxisId="right" type="monotone" dataKey="waterUsage" stroke="#82ca9d" name="Вода (м³)" />
            <Line yAxisId="right" type="monotone" dataKey="gasUsage" stroke="#ffc658" name="Газ (м³)" />
          </LineChart>
        </ResponsiveContainer>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Электричество (кВт⋅ч)</TableHead>
              <TableHead>Вода (м³)</TableHead>
              <TableHead>Газ (м³)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilityReadings.map((reading) => (
              <TableRow key={reading.id}>
                <TableCell>{reading.date}</TableCell>
                <TableCell>{reading.electricityUsage}</TableCell>
                <TableCell>{reading.waterUsage}</TableCell>
                <TableCell>{reading.gasUsage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default UtilityManagement

