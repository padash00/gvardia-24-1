"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AuditLog {
  id: number
  username: string
  action: string
  timestamp: string
  details: string
}

const UserActivityAudit: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 1,
      username: "admin",
      action: "Вход в систему",
      timestamp: "2024-03-15 10:30:00",
      details: "IP: 192.168.1.100",
    },
    {
      id: 2,
      username: "manager",
      action: "Создание договора",
      timestamp: "2024-03-15 11:15:00",
      details: "Договор #1234",
    },
    {
      id: 3,
      username: "owner",
      action: "Просмотр финансового отчета",
      timestamp: "2024-03-15 14:45:00",
      details: "Отчет за март 2024",
    },
    {
      id: 4,
      username: "admin",
      action: "Изменение прав доступа",
      timestamp: "2024-03-16 09:20:00",
      details: "Пользователь: manager",
    },
    {
      id: 5,
      username: "manager",
      action: "Обновление статуса оплаты",
      timestamp: "2024-03-16 13:10:00",
      details: 'Арендатор: ООО "ТехноПром"',
    },
  ])

  const [filterUsername, setFilterUsername] = useState("")
  const [filterAction, setFilterAction] = useState("")

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.username.toLowerCase().includes(filterUsername.toLowerCase()) &&
      log.action.toLowerCase().includes(filterAction.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Аудит действий пользователей</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Фильтр по пользователю"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фильтр по действию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все действия</SelectItem>
              <SelectItem value="Вход">Вход в систему</SelectItem>
              <SelectItem value="Создание">Создание договора</SelectItem>
              <SelectItem value="Просмотр">Просмотр отчета</SelectItem>
              <SelectItem value="Изменение">Изменение прав</SelectItem>
              <SelectItem value="Обновление">Обновление статуса</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Действие</TableHead>
              <TableHead>Время</TableHead>
              <TableHead>Детали</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.username}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default UserActivityAudit

