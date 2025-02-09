"use client"

import type React from "react"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Tenant {
  id: number
  name: string
  room: string
  floor: number
  rentAmount: number
  paymentStatus: "Оплачено" | "Ожидает оплаты" | "Просрочено"
}

interface ReportingDashboardProps {
  tenants: Tenant[]
}

const ReportingDashboard: React.FC<ReportingDashboardProps> = ({ tenants }) => {
  const totalRooms = 15
  const occupiedRooms = tenants.length
  const occupancyRate = totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(2) : "0"

  const totalRent = useMemo(
    () => tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0),
    [tenants]
  )

  const paidRent = useMemo(
    () =>
      tenants
        .filter((tenant) => tenant.paymentStatus === "Оплачено")
        .reduce((sum, tenant) => sum + tenant.rentAmount, 0),
    [tenants]
  )

  const paidRentPercentage = totalRent > 0 ? ((paidRent / totalRent) * 100).toFixed(2) : "0"

  const floorData = useMemo(
    () =>
      [0, 1, 2, 3].map((floor) => ({
        name: floor === 0 ? "Подвал" : `${floor} этаж`,
        occupiedRooms: tenants.filter((tenant) => tenant.floor === floor).length,
        totalRooms: floor === 0 ? 1 : floor === 3 ? 1 : floor === 1 ? 5 : 8,
      })),
    [tenants]
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Отчеты и аналитика</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Занятость помещений</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{occupancyRate}%</p>
            <p>
              {occupiedRooms} из {totalRooms} помещений заняты
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Общая арендная плата</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{totalRent.toLocaleString()} ₸</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Собранная арендная плата</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">{paidRent.toLocaleString()} ₸</p>
            <p>{paidRentPercentage}% от общей суммы</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Занятость по этажам</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={floorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupiedRooms" name="Занятые помещения" fill="#4CAF50" />
              <Bar dataKey="totalRooms" name="Всего помещений" fill="#FF7043" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportingDashboard
