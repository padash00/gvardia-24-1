import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RepairRequest {
  id: number
  room: string
  description: string
  status: "Новая" | "В работе" | "Завершена"
  createdAt: string
}

const RepairRequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<RepairRequest[]>([
    {
      id: 1,
      room: "101",
      description: "Протечка в потолке",
      status: "Новая",
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      room: "203",
      description: "Не работает кондиционер",
      status: "В работе",
      createdAt: "2023-05-14",
    },
  ])

  const [newRequest, setNewRequest] = useState<Partial<RepairRequest>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewRequest({ ...newRequest, [name]: value })
  }

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newRequestWithId = {
      ...newRequest,
      id: Date.now(),
      status: "Новая",
      createdAt: new Date().toISOString().split("T")[0],
    } as RepairRequest
    setRequests([...requests, newRequestWithId])
    setNewRequest({})
  }

  const handleStatusChange = (id: number, newStatus: RepairRequest["status"]) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: newStatus } : request)))
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить заявку</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить заявку на ремонт</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRequest} className="space-y-4">
            <div>
              <Label htmlFor="room">Номер помещения</Label>
              <Input id="room" name="room" value={newRequest.room || ""} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Описание проблемы</Label>
              <Input
                id="description"
                name="description"
                value={newRequest.description || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Добавить</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Помещение</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.room}</TableCell>
              <TableCell>{request.description}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.createdAt}</TableCell>
              <TableCell>
                <Select
                  value={request.status}
                  onValueChange={(value) => handleStatusChange(request.id, value as RepairRequest["status"])}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Изменить статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Новая">Новая</SelectItem>
                    <SelectItem value="В работе">В работе</SelectItem>
                    <SelectItem value="Завершена">Завершена</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RepairRequestManagement

