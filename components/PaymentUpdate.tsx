"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { tenants } from "@/utils/mockData"

// Моковые данные для платежей (в реальном приложении это было бы в отдельном файле)
const mockPayments = [
  { id: 1, tenantId: 1, amount: 500000, dueDate: "2024-03-01", status: "Не оплачено" },
  { id: 2, tenantId: 2, amount: 750000, dueDate: "2024-03-01", status: "Оплачено" },
  { id: 3, tenantId: 3, amount: 600000, dueDate: "2024-03-01", status: "Не оплачено" },
]

const PaymentUpdate: React.FC = () => {
  const [payments, setPayments] = useState(mockPayments)

  const updatePaymentStatus = (paymentId: number, newStatus: string) => {
    setPayments(payments.map((payment) => (payment.id === paymentId ? { ...payment, status: newStatus } : payment)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Обновление статуса оплаты</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Арендатор</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Дата оплаты</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => {
              const tenant = tenants.find((t) => t.id === payment.tenantId)
              return (
                <TableRow key={payment.id}>
                  <TableCell>{tenant?.name}</TableCell>
                  <TableCell>{payment.amount} ₸</TableCell>
                  <TableCell>{payment.dueDate}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) => updatePaymentStatus(payment.id, value)}
                      defaultValue={payment.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Изменить статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Оплачено">Оплачено</SelectItem>
                        <SelectItem value="Не оплачено">Не оплачено</SelectItem>
                        <SelectItem value="Просрочено">Просрочено</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default PaymentUpdate

