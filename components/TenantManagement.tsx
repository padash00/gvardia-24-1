"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { tenants } from "@/utils/mockData"

const TenantManagement = () => {
  const [localTenants, setLocalTenants] = useState(tenants)
  const [newTenant, setNewTenant] = useState<Partial<(typeof tenants)[0]>>({})
  const [editingTenant, setEditingTenant] = useState<(typeof tenants)[0] | null>(null)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingTenant) {
      setEditingTenant({ ...editingTenant, [name]: value })
    } else {
      setNewTenant({ ...newTenant, [name]: value })
    }
  }

  const handleSelectChange = (value: string) => {
    if (editingTenant) {
      setEditingTenant({ ...editingTenant, type: value as "ИП" | "ТОО" })
    } else {
      setNewTenant({ ...newTenant, type: value as "ИП" | "ТОО" })
    }
  }

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault()
    const addedTenant = { ...newTenant, id: localTenants.length + 1 } as (typeof tenants)[0]
    setLocalTenants([...localTenants, addedTenant])
    setNewTenant({})
    toast({
      title: "Success",
      description: "Tenant added successfully.",
    })
  }

  const handleEditTenant = (tenant: (typeof tenants)[0]) => {
    setEditingTenant(tenant)
  }

  const handleUpdateTenant = () => {
    if (editingTenant) {
      setLocalTenants(localTenants.map((t) => (t.id === editingTenant.id ? editingTenant : t)))
      setEditingTenant(null)
      toast({
        title: "Success",
        description: "Tenant updated successfully.",
      })
    }
  }

  const handleDeleteTenant = (id: number) => {
    setLocalTenants(localTenants.filter((tenant) => tenant.id !== id))
    toast({
      title: "Success",
      description: "Tenant deleted successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Управление арендаторами</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить арендатора</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingTenant ? "Редактировать арендатора" : "Добавить арендатора"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={editingTenant ? handleUpdateTenant : handleAddTenant} className="space-y-4">
            <div>
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                name="name"
                value={editingTenant ? editingTenant.name : newTenant.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Тип</Label>
              <Select onValueChange={handleSelectChange} value={editingTenant ? editingTenant.type : newTenant.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ИП">ИП</SelectItem>
                  <SelectItem value="ТОО">ТОО</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="details">Реквизиты</Label>
              <Input
                id="details"
                name="details"
                value={editingTenant ? editingTenant.details : newTenant.details || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">{editingTenant ? "Обновить" : "Добавить"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Список арендаторов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Реквизиты</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.type}</TableCell>
                  <TableCell>{tenant.details}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditTenant(tenant)}>
                      Редактировать
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTenant(tenant.id)}
                      className="ml-2"
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default TenantManagement

