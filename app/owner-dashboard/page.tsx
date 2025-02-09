"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UserManagement from "@/components/UserManagement"
import FinancialBalance from "@/components/FinancialBalance"
import BuildingManagement from "@/components/BuildingManagement"
import FinancialReports from "@/components/FinancialReports"
import ReportExport from "@/components/ReportExport"
import NotificationSystem from "@/components/NotificationSystem"
import EventCalendar from "@/components/EventCalendar"
import MaintenanceManagement from "@/components/MaintenanceManagement"
import SpaceEfficiencyAnalysis from "@/components/SpaceEfficiencyAnalysis"
import DiscountBonusSystem from "@/components/DiscountBonusSystem"

export default function OwnerDashboard() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "userManagement":
        return <UserManagement />
      case "financialBalance":
        return <FinancialBalance />
      case "buildingManagement":
        return <BuildingManagement />
      case "financialReports":
        return <FinancialReports />
      case "reportExport":
        return <ReportExport />
      case "notificationSystem":
        return <NotificationSystem />
      case "eventCalendar":
        return <EventCalendar />
      case "maintenanceManagement":
        return <MaintenanceManagement />
      case "spaceEfficiencyAnalysis":
        return <SpaceEfficiencyAnalysis />
      case "discountBonusSystem":
        return <DiscountBonusSystem />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header role="Владелец" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель управления владельца</h2>
        {activeComponent ? (
          <div>
            <Button onClick={() => setActiveComponent(null)} className="mb-4">
              Назад
            </Button>
            {renderActiveComponent()}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление зданиями</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("buildingManagement")}>
                  Управление зданиями
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("userManagement")}>
                  Управление пользователями
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Финансовый баланс</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("financialBalance")}>
                  Просмотр баланса
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Финансовая отчетность</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("financialReports")}>
                  Просмотр отчетов
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Экспорт отчетов</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("reportExport")}>
                  Экспорт отчетов
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("notificationSystem")}>
                  Просмотр уведомлений
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Календарь событий</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("eventCalendar")}>
                  Открыть календарь
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Техническое обслуживание</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("maintenanceManagement")}>
                  Управление обслуживанием
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Анализ эффективности площадей</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("spaceEfficiencyAnalysis")}>
                  Просмотр анализа
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Скидки и бонусы</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("discountBonusSystem")}>
                  Управление скидками
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

