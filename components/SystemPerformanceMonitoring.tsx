"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceData {
  timestamp: string
  cpuUsage: number
  memoryUsage: number
  activeUsers: number
}

const SystemPerformanceMonitoring: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])

  useEffect(() => {
    // Имитация получения данных в реальном времени
    const interval = setInterval(() => {
      const newData: PerformanceData = {
        timestamp: new Date().toLocaleTimeString(),
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        activeUsers: Math.floor(Math.random() * 100),
      }
      setPerformanceData((prevData) => [...prevData.slice(-19), newData])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мониторинг производительности системы</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cpuUsage" name="Использование CPU (%)" stroke="#8884d8" />
            <Line type="monotone" dataKey="memoryUsage" name="Использование памяти (%)" stroke="#82ca9d" />
            <Line type="monotone" dataKey="activeUsers" name="Активные пользователи" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default SystemPerformanceMonitoring

