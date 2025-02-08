"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"

interface Tenant {
  id: number
  name: string
  contractEndDate: string
  lastPaymentDate: string
  status: "active" | "debt" | "eviction"
}

interface Notification {
  id: number
  type: "contract" | "payment" | "debt"
  message: string
  date: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const RentalAutomation = () => {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchTenants()
    fetchNotifications()
  }, [])

  const fetchTenants = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/tenants`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch tenants")
      }
      const data = await response.json()
      setTenants(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tenants. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch notifications")
      }
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load notifications. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleAddPenalty = async (tenantId: number, amount: number) => {
    try {
      const response = await fetch(`${API_URL}/tenants/${tenantId}/penalty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount }),
      })
      if (!response.ok) {
        throw new Error("Failed to add penalty")
      }
      toast({
        title: "Success",
        description: "Penalty added successfully.",
      })
      fetchTenants() // Refresh tenant list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add penalty. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateTenantStatus = async (tenantId: number, status: "active" | "debt" | "eviction") => {
    try {
      const response = await fetch(`${API_URL}/tenants/${tenantId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        throw new Error("Failed to update tenant status")
      }
      toast({
        title: "Success",
        description: "Tenant status updated successfully.",
      })
      fetchTenants() // Refresh tenant list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tenant status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Автоматизация аренды и платежей</h2>

      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-center space-x-2">
                  {notification.type === "contract" && <AlertTriangle className="text-yellow-500" />}
                  {notification.type === "payment" && <CheckCircle className="text-green-500" />}
                  {notification.type === "debt" && <AlertTriangle className="text-red-500" />}
                  <span>{notification.message}</span>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет новых уведомлений</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список арендаторов</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Окончание договора</TableHead>
                  <TableHead>Последняя оплата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.contractEndDate}</TableCell>
                    <TableCell>{tenant.lastPaymentDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tenant.status === "active" ? "default" : tenant.status === "debt" ? "destructive" : "outline"
                        }
                      >
                        {tenant.status === "active" ? "Активен" : tenant.status === "debt" ? "Должник" : "Выселение"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Добавить штраф
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Добавить штраф</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const amount = Number.parseFloat((e.target as HTMLFormElement).amount.value)
                              handleAddPenalty(tenant.id, amount)
                            }}
                            className="space-y-4"
                          >
                            <div>
                              <Label htmlFor="amount">Сумма штрафа</Label>
                              <Input id="amount" name="amount" type="number" required />
                            </div>
                            <Button type="submit">Добавить</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {tenant.status !== "eviction" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-2"
                          onClick={() => handleUpdateTenantStatus(tenant.id, "eviction")}
                        >
                          Выселение
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RentalAutomation

