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
import { Textarea } from "@/components/ui/textarea"

interface TenantRequest {
  id: number
  tenantName: string
  requestType: "Ремонт" | "Обслуживание" | "Жалоба" | "Другое"
  description: string
  status: "Новая" | "В обработке" | "Выполнена" | "Отклонена"
  createdAt: string
}

const TenantRequestSystem: React.FC = () => {
  const [requests, setRequests] = useState<TenantRequest[]>([
    {
      id: 1,
      tenantName: 'ООО "ТехноПром"',
      requestType: "Ремонт",
      description: "Протечка в потолке",
      status: "В обработке",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      tenantName: "ИП Иванов",
      requestType: "Обслуживание",
      description: "Замена лампочек",
      status: "Новая",
      createdAt: "2024-03-16",
    },
    {
      id: 3,
      tenantName: 'АО "МегаСтрой"',
      requestType: "Жалоба",
      description: "Шум от соседей",
      status: "Выполнена",
      createdAt: "2024-03-14",
    },
  ])

  const [newRequest, setNewRequest] = useState<Partial<TenantRequest>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewRequest({ ...newRequest, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewRequest({ ...newRequest, [name]: value })
  }

  const addRequest = () => {
    if (newRequest.tenantName && newRequest.requestType && newRequest.description) {
      const currentDate = new Date().toISOString().split("T")[0]
      setRequests([
        ...requests,
        {
          id: requests.length + 1,
          ...(newRequest as Omit<TenantRequest, "id" | "status" | "createdAt">),
          status: "Новая",
          createdAt: currentDate,
        },
      ])
      setNewRequest({})
    }
  }

  const updateRequestStatus = (id: number, newStatus: TenantRequest["status"]) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: newStatus } : request)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Система обработки заявок от арендаторов</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">Создать заявку</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новая заявка</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tenantName" className="text-right">
                  Арендатор
                </Label>
                <Input
                  id="tenantName"
                  name="tenantName"
                  value={newRequest.tenantName || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="requestType" className="text-right">
                  Тип заявки
                </Label>
                <Select onValueChange={(value) => handleSelectChange("requestType", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите тип заявки" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ремонт">Ремонт</SelectItem>
                    <SelectItem value="Обслуживание">Обслуживание</SelectItem>
                    <SelectItem value="Жалоба">Жалоба</SelectItem>
                    <SelectItem value="Другое">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newRequest.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addRequest}>Создать заявку</Button>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Арендатор</TableHead>
              <TableHead>Тип заявки</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.tenantName}</TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.createdAt}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => updateRequestStatus(request.id, value as TenantRequest["status"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Изменить статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Новая">Новая</SelectItem>
                      <SelectItem value="В обработке">В обработке</SelectItem>
                      <SelectItem value="Выполнена">Выполнена</SelectItem>
                      <SelectItem value="Отклонена">Отклонена</SelectItem>
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

export default TenantRequestSystem

