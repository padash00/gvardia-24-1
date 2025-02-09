"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TenantManagement from "@/components/TenantManagement"
import RentalAutomation from "@/components/RentalAutomation"
import UserAccessManagement from "@/components/UserAccessManagement"
import UserActivityAudit from "@/components/UserActivityAudit"
import SystemSettings from "@/components/SystemSettings"
import BackupManagement from "@/components/BackupManagement"
import SystemPerformanceMonitoring from "@/components/SystemPerformanceMonitoring"

export default function AdminDashboard() {
  const [username, setUsername] = useState<string | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedRole = localStorage.getItem("role")

    if (!storedUsername || storedRole !== "admin") {
      router.push("/login")
    } else {
      setUsername(storedUsername)
    }
  }, [router])

  if (!username) {
    return null // или можно отобразить загрузку
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "tenantManagement":
        return <TenantManagement />
      case "rentalAutomation":
        return <RentalAutomation />
      case "userAccessManagement":
        return <UserAccessManagement />
      case "userActivityAudit":
        return <UserActivityAudit />
      case "systemSettings":
        return <SystemSettings />
      case "backupManagement":
        return <BackupManagement />
      case "systemPerformanceMonitoring":
        return <SystemPerformanceMonitoring />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header role="Администратор" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель управления администратора</h2>
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
                <CardTitle>Управление арендаторами</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("tenantManagement")}>
                  Управление арендаторами
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Автоматизация аренды</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("rentalAutomation")}>
                  Управление автоматизацией
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Управление правами доступа</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("userAccessManagement")}>
                  Настройка прав доступа
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Аудит действий пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("userActivityAudit")}>
                  Просмотр аудита
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Системные настройки</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("systemSettings")}>
                  Настройка параметров
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Управление резервными копиями</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("backupManagement")}>
                  Резервное копирование
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Мониторинг производительности</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setActiveComponent("systemPerformanceMonitoring")}>
                  Просмотр показателей
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

