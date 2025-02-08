"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UserManagement from "@/components/UserManagement"
import FinancialBalance from "@/components/FinancialBalance"
import BuildingManagement from "@/components/BuildingManagement"
import FinancialReports from "@/components/FinancialReports"

export default function OwnerDashboard() {
  const [username, setUsername] = useState<string | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedRole = localStorage.getItem("role")

    if (!storedUsername || storedRole !== "owner") {
      router.push("/login")
    } else {
      setUsername(storedUsername)
    }
  }, [router])

  if (!username) {
    return null
  }

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
                <Button className="w-full">Экспорт отчетов</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Настройки системы</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Настройки системы</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

