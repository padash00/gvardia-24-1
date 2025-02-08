import type React from "react"
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
  const totalRooms = 15 // Обновлено в соответствии с предоставленной информацией
  const occupiedRooms = tenants.length
  const occupancyRate = (occupiedRooms / totalRooms) * 100

  const totalRent = tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0)
  const paidRent = tenants
    .filter((tenant) => tenant.paymentStatus === "Оплачено")
    .reduce((sum, tenant) => sum + tenant.rentAmount, 0)

  const floorData = [0, 1, 2, 3].map((floor) => ({
    name: floor === 0 ? "Подвал" : `${floor} этаж`,
    occupiedRooms: tenants.filter((tenant) => tenant.floor === floor).length,
    totalRooms: floor === 0 ? 1 : floor === 3 ? 1 : floor === 1 ? 5 : 8, // Обновлено в соответствии с предоставленной информацией
  }))

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Отчеты и аналитика</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Занятость помещений</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{occupancyRate.toFixed(2)}%</p>
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
            <p className="text-3xl font-bold">{totalRent.toLocaleString()} ₸</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Собранная арендная плата</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{paidRent.toLocaleString()} ₸</p>
            <p>{((paidRent / totalRent) * 100).toFixed(2)}% от общей суммы</p>
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
              <Bar dataKey="occupiedRooms" name="Занятые помещения" fill="#8884d8" />
              <Bar dataKey="totalRooms" name="Всего помещений" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportingDashboard

