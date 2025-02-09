"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { buildings } from "@/utils/mockData"

interface FloorData {
  floor: string
  totalArea: number
  occupiedArea: number
  occupancyRate: number
}

const SpaceEfficiencyAnalysis: React.FC = () => {
  const floorData: FloorData[] = buildings.flatMap((building) =>
    building.floors.map((floor) => {
      const totalArea = floor.rooms.reduce((sum, room) => sum + room.area, 0)
      const occupiedArea = floor.rooms.filter((room) => room.isOccupied).reduce((sum, room) => sum + room.area, 0)
      const occupancyRate = (occupiedArea / totalArea) * 100
      return {
        floor: `${building.name} - Этаж ${floor.number}`,
        totalArea,
        occupiedArea,
        occupancyRate,
      }
    }),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Анализ эффективности использования площадей</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={floorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="floor" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalArea" name="Общая площадь" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="occupiedArea" name="Занятая площадь" fill="#82ca9d" />
            <Bar yAxisId="right" dataKey="occupancyRate" name="Процент занятости" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SpaceEfficiencyAnalysis

