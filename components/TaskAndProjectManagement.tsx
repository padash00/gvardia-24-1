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

interface Task {
  id: number
  title: string
  assignee: string
  status: "Не начато" | "В процессе" | "Завершено"
  dueDate: string
}

const TaskAndProjectManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Ремонт лифта", assignee: "Иван Петров", status: "В процессе", dueDate: "2024-04-15" },
    { id: 2, title: "Замена окон", assignee: "Мария Сидорова", status: "Не начато", dueDate: "2024-05-01" },
    {
      id: 3,
      title: "Обновление системы безопасности",
      assignee: "Алексей Иванов",
      status: "Завершено",
      dueDate: "2024-03-30",
    },
  ])

  const [newTask, setNewTask] = useState<Partial<Task>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewTask({ ...newTask, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTask({ ...newTask, [name]: value })
  }

  const addTask = () => {
    if (newTask.title && newTask.assignee && newTask.status && newTask.dueDate) {
      setTasks([...tasks, { id: tasks.length + 1, ...(newTask as Task) }])
      setNewTask({})
    }
  }

  const updateTaskStatus = (id: number, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление задачами и проектами</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Добавить задачу</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая задача</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Название
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newTask.title || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Исполнитель
                </Label>
                <Input
                  id="assignee"
                  name="assignee"
                  value={newTask.assignee || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
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
                    <SelectItem value="Не начато">Не начато</SelectItem>
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
            <Button onClick={addTask}>Добавить задачу</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Исполнитель</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Срок</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => updateTaskStatus(task.id, value as Task["status"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Изменить статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Не начато">Не начато</SelectItem>
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

export default TaskAndProjectManagement

