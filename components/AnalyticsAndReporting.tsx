"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const occupancyData = [
  { name: "Янв", occupied: 85, vacant: 15 },
  { name: "Фев", occupied: 88, vacant: 12 },
  { name: "Мар", occupied: 90, vacant: 10 },
  { name: "Апр", occupied: 92, vacant: 8 },
  { name: "Май", occupied: 95, vacant: 5 },
  { name: "Июн", occupied: 95, vacant: 5 },
]

const revenueData = [
  { name: "Янв", revenue: 500000 },
  { name: "Фев", revenue: 520000 },
  { name: "Мар", revenue: 540000 },
  { name: "Апр", revenue: 560000 },
  { name: "Май", revenue: 580000 },
  { name: "Июн", revenue: 600000 },
]

const tenantMixData = [
  { name: "Офисы", value: 60 },
  { name: "Розница", value: 25 },
  { name: "Склады", value: 15 },
]

const AnalyticsAndReporting: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Занятость помещений</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupied" stackId="a" fill="#8884d8" name="Занято" />
              <Bar dataKey="vacant" stackId="a" fill="#82ca9d" name="Свободно" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Динамика дохода</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Доход" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Распределение арендаторов</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={tenantMixData} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsAndReporting

