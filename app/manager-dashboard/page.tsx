"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ContractCreation from "@/components/ContractCreation"
import PaymentUpdate from "@/components/PaymentUpdate"
import NotificationSystem from "@/components/NotificationSystem"
import EventCalendar from "@/components/EventCalendar"
import MaintenanceManagement from "@/components/MaintenanceManagement"
import DiscountBonusSystem from "@/components/DiscountBonusSystem"

export default function ManagerDashboard() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "contractCreation":
        return <ContractCreation />
      case "paymentUpdate":
        return <PaymentUpdate />
      case "notificationSystem":
        return <NotificationSystem />
      case "eventCalendar":
        return <EventCalendar />
      case "maintenanceManagement":
        return <MaintenanceManagement />
      case "discountBonusSystem":
        return <DiscountBonusSystem />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header role="Менеджер" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель управления менеджера</h2>
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
                <CardTitle>Создание договора</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("contractCreation")}>
                  Создать договор
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Обновление статуса оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("paymentUpdate")}>
                  Обновить статус оплаты
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

