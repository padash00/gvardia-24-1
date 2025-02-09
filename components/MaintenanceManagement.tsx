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

interface MaintenanceTask {
  id: number
  description: string
  room: string
  priority: "Низкий" | "Средний" | "Высокий"
  status: "Запланировано" | "В процессе" | "Завершено"
  dueDate: string
}

const MaintenanceManagement: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: 1,
      description: "Замена лампочек",
      room: "101",
      priority: "Низкий",
      status: "Запланировано",
      dueDate: "2024-03-20",
    },
    {
      id: 2,
      description: "Ремонт кондиционера",
      room: "205",
      priority: "Высокий",
      status: "В процессе",
      dueDate: "2024-03-18",
    },
    {
      id: 3,
      description: "Покраска стен",
      room: "302",
      priority: "Средний",
      status: "Завершено",
      dueDate: "2024-03-15",
    },
  ])

  const [newTask, setNewTask] = useState<Partial<MaintenanceTask>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTask({ ...newTask, [name]: value })
  }

  const handleAddTask = () => {
    if (newTask.description && newTask.room && newTask.priority && newTask.status && newTask.dueDate) {
      setTasks([...tasks, { id: tasks.length + 1, ...(newTask as MaintenanceTask) }])
      setNewTask({})
    }
  }

  const handleUpdateStatus = (id: number, newStatus: MaintenanceTask["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление техническим обслуживанием</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Добавить задачу</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая задача обслуживания</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newTask.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Помещение
                </Label>
                <Input
                  id="room"
                  name="room"
                  value={newTask.room || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Приоритет
                </Label>
                <Select onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Низкий">Низкий</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Высокий">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Статус
                </Label>
                <Select onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Запланировано">Запланировано</SelectItem>
                    <SelectItem value="В процессе">В процессе</SelectItem>
                    <SelectItem value="Завершено">Завершено</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Срок
                </Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={newTask.dueDate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddTask}>Добавить задачу</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Описание</TableHead>
              <TableHead>Помещение</TableHead>
              <TableHead>Приоритет</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Срок</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.room}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => handleUpdateStatus(task.id, value as MaintenanceTask["status"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Изменить статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Запланировано">Запланировано</SelectItem>
                      <SelectItem value="В процессе">В процессе</SelectItem>
                      <SelectItem value="Завершено">Завершено</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default MaintenanceManagement

