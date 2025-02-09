"use client"

import { useState, useEffect, useMemo, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Динамическая загрузка компонентов
const TenantManagement = lazy(() => import("@/components/TenantManagement"))
const RentalAutomation = lazy(() => import("@/components/RentalAutomation"))

export default function AdminDashboard() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

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
    return null // Можно добавить лоадер или редирект
  }

  const componentMap: Record<string, React.ReactNode> = useMemo(
    () => ({
      tenantManagement: <TenantManagement />,
      rentalAutomation: <RentalAutomation />,
    }),
    []
  )

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
            <Suspense fallback={<p>Загрузка...</p>}>{componentMap[activeComponent]}</Suspense>
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
                <CardTitle>Управление договорами</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Управление договорами</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Управление помещениями</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Управление помещениями</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Подтверждение платежей</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Подтверждение платежей</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Просмотр документов</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Просмотр документов</Button>
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
          </div>
        )}
      </main>
    </div>
  )
}
