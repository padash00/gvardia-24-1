"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download } from "lucide-react"
import { financialData, expenseCategories } from "@/utils/mockData"

const FinancialReports = () => {
  const [dateRange, setDateRange] = useState<"month" | "quarter" | "year">("month")
  const [startDate, setStartDate] = useState<Date>(new Date())

  const handleExportPDF = async () => {
    console.log("Экспорт в PDF")
  }

  const handleExportExcel = async () => {
    console.log("Экспорт в Excel")
  }

  const memoizedIncomeExpensesChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={financialData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" name="Доходы" stroke="#4CAF50" />
          <Line type="monotone" dataKey="expenses" name="Расходы" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>
    ),
    [financialData]
  )

  const memoizedExpensesStructureChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseCategories}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    ),
    [expenseCategories]
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Финансовая отчетность</h2>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline" aria-label="Экспорт в PDF">
            <Download className="mr-2 h-4 w-4" />
            Экспорт в PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline" aria-label="Экспорт в Excel">
            <Download className="mr-2 h-4 w-4" />
            Экспорт в Excel
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={dateRange} onValueChange={(value: "month" | "quarter" | "year") => setDateRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="quarter">Квартал</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={startDate} setDate={setStartDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Доходы и расходы</CardTitle>
          </CardHeader>
          <CardContent>{memoizedIncomeExpensesChart}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Структура расходов</CardTitle>
          </CardHeader>
          <CardContent>{memoizedExpensesStructureChart}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детальный отчет</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 border border-gray-300">Период</th>
                  <th className="text-right p-2 border border-gray-300">Доходы</th>
                  <th className="text-right p-2 border border-gray-300">Расходы</th>
                  <th className="text-right p-2 border border-gray-300">Прибыль</th>
                  <th className="text-right p-2 border border-gray-300">Рентабельность</th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((data) => {
                  const profit = data.income - data.expenses
                  const profitability = data.income > 0 ? ((profit / data.income) * 100).toFixed(2) : "0.00"

                  return (
                    <tr key={data.date} className="border-b border-gray-300">
                      <td className="p-2 border border-gray-300">{data.date}</td>
                      <td className="text-right p-2 border border-gray-300 text-green-600">
                        {data.income.toLocaleString()} ₸
                      </td>
                      <td className="text-right p-2 border border-gray-300 text-red-600">
                        {data.expenses.toLocaleString()} ₸
                      </td>
                      <td className="text-right p-2 border border-gray-300 font-semibold">
                        {profit.toLocaleString()} ₸
                      </td>
                      <td className="text-right p-2 border border-gray-300">
                        {profitability}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FinancialReports
