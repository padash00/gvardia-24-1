"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertTriangle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: number
  type: "payment" | "contract"
  message: string
  date: string
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    const mockNotifications: Notification[] = [
      { id: 1, type: "payment", message: 'Просрочен платеж от ООО "ТехноПром"', date: "2024-03-15" },
      { id: 2, type: "contract", message: 'Договор с ИП "Иванов" истекает через 30 дней', date: "2024-04-01" },
      { id: 3, type: "payment", message: 'Получен платеж от АО "МегаСтрой"', date: "2024-03-10" },
    ]
    setNotifications(mockNotifications)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Уведомления
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                {notification.type === "payment" ? (
                  notification.message.includes("Просрочен") ? (
                    <AlertTriangle className="text-red-500" />
                  ) : (
                    <CheckCircle className="text-green-500" />
                  )
                ) : (
                  <AlertTriangle className="text-yellow-500" />
                )}
                <span>{notification.message}</span>
                <Badge variant="outline">{notification.date}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет новых уведомлений</p>
        )}
      </CardContent>
    </Card>
  )
}

export default NotificationSystem

