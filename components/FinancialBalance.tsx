"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface FinancialData {
  readonly totalIncome: number
  readonly totalExpenses: number
  readonly netProfit: number
  readonly recentTransactions: readonly Transaction[]
}

interface Transaction {
  readonly id: number
  readonly date: string
  readonly description: string
  readonly amount: number
  readonly type: "income" | "expense"
}

const FinancialBalance = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinancialData = async () => {
      // Имитация загрузки данных
      const mockData: FinancialData = {
        totalIncome: 5000000,
        totalExpenses: 2000000,
        netProfit: 3000000,
        recentTransactions: [
          { id: 1, date: "2023-05-01", description: "Арендная плата (Компания А)", amount: 500000, type: "income" },
          { id: 2, date: "2023-05-02", description: "Коммунальные услуги", amount: 100000, type: "expense" },
          { id: 3, date: "2023-05-03", description: "Арендная плата (Компания Б)", amount: 600000, type: "income" },
          { id: 4, date: "2023-05-04", description: "Ремонтные работы", amount: 200000, type: "expense" },
          { id: 5, date: "2023-05-05", description: "Арендная плата (Компания В)", amount: 450000, type: "income" },
        ],
      }
      setFinancialData(mockData)
      setLoading(false)
    }

    fetchFinancialData()
  }, [])

  const formattedData = useMemo(() => {
    if (!financialData) return null

    return {
      ...financialData,
      recentTransactions: financialData.recentTransactions.map((transaction) => ({
        ...transaction,
        formattedDate: new Intl.DateTimeFormat("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(transaction.date)),
      })),
    }
  }, [financialData])

  if (loading) {
    return <div className="text-center text-lg font-semibold">Загрузка...</div>
  }

  if (!formattedData) {
    return <div className="text-center text-lg font-semibold text-red-500">Ошибка загрузки данных</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Финансовый баланс</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Общий доход</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formattedData.totalIncome.toLocaleString()} ₸
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Общие расходы</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formattedData.totalExpenses.toLocaleString()} ₸
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Чистая прибыль</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                formattedData.netProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formattedData.netProfit.toLocaleString()} ₸
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние транзакции</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Тип</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedData.recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.formattedDate}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                    {transaction.amount.toLocaleString()} ₸
                  </TableCell>
                  <TableCell>{transaction.type === "income" ? "Доход" : "Расход"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinancialBalance
