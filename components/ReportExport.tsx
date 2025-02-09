import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { financialData, buildings, tenants } from "@/utils/mockData"

const ReportExport: React.FC = () => {
  const [reportType, setReportType] = useState<string>("")

  const generateReport = () => {
    let reportContent = ""

    switch (reportType) {
      case "financial":
        reportContent = `Финансовый отчет:\n\n${financialData
          .map((data) => `Дата: ${data.date}, Доход: ${data.income}, Расходы: ${data.expenses}`)
          .join("\n")}`
        break
      case "occupancy":
        reportContent = `Отчет по занятости помещений:\n\n${buildings
          .map(
            (building) =>
              `Здание: ${building.name}\n${building.floors
                .map(
                  (floor) =>
                    `Этаж ${floor.number}: ${floor.rooms.filter((room) => room.isOccupied).length} из ${floor.rooms.length} помещений заняты`,
                )
                .join("\n")}`,
          )
          .join("\n\n")}`
        break
      case "tenants":
        reportContent = `Отчет по арендаторам:\n\n${tenants
          .map((tenant) => `Название: ${tenant.name}, Тип: ${tenant.type}, Реквизиты: ${tenant.details}`)
          .join("\n")}`
        break
      default:
        reportContent = "Выберите тип отчета"
    }

    // В реальном приложении здесь был бы код для создания и скачивания файла
    console.log(reportContent)
    alert("Отчет сгенерирован. В реальном приложении здесь было бы скачивание файла.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Экспорт отчетов</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setReportType}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип отчета" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="financial">Финансовый отчет</SelectItem>
            <SelectItem value="occupancy">Отчет по занятости помещений</SelectItem>
            <SelectItem value="tenants">Отчет по арендаторам</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={generateReport} disabled={!reportType}>
          Сгенерировать отчет
        </Button>
      </CardContent>
    </Card>
  )
}

export default ReportExport

