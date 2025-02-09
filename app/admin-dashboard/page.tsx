"use client"

import { useState, useEffect, Suspense, lazy } from "react"
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
  const [isLoading, setIsLoading] = useState(true)

  // Проверка авторизации и роли пользователя
  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedRole = localStorage.getItem("role")

    // Если нет логина или роль не admin, перенаправляем на /login
    if (!storedUsername || storedRole !== "admin") {
      router.push("/login")
    } else {
      setUsername(storedUsername)
    }

    setIsLoading(false)
  }, [router])

  // Если ещё загружаем данные — показываем индикатор
  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Загрузка...</p>
  }

  // Если пользователя нет, просто ничего не рендерим, поскольку useEffect перенаправит на /login
  if (!username) {
    return null
  }

  // Список опций для админ-панели
  const adminOptions = [
    {
      id: "tenantManagement",
      title: "Управление арендаторами",
      onClick: () => setActiveComponent("tenantManagement"),
    },
    {
      id: "contracts",
      title: "Управление договорами",
      // При желании подключите динамический импорт или перенаправление
      onClick: () => console.log("Управление договорами"),
    },
    {
      id: "properties",
      title: "Управление помещениями",
      onClick: () => console.log("Управление помещениями"),
    },
    {
      id: "payments",
      title: "Подтверждение платежей",
      onClick: () => console.log("Подтверждение платежей"),
    },
    {
      id: "documents",
      title: "Просмотр документов",
      onClick: () => console.log("Просмотр документов"),
    },
    {
      id: "rentalAutomation",
      title: "Автоматизация аренды",
      onClick: () => setActiveComponent("rentalAutomation"),
    },
  ]

  // Функция возврата в главное меню
  const handleBack = () => setActiveComponent(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header role="Администратор" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель управления администратора</h2>

        {activeComponent ? (
          <div>
            <Button onClick={handleBack} className="mb-4">
              Назад
            </Button>
            {/* Подгружаем нужный компонент асинхронно */}
            <Suspense fallback={<p className="text-center">Загрузка компонента...</p>}>
              {activeComponent === "tenantManagement" && <TenantManagement />}
              {activeComponent === "rentalAutomation" && <RentalAutomation />}
            </Suspense>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminOptions.map((option) => (
              <Card key={option.id}>
                <CardHeader>
                  <CardTitle>{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={option.onClick}>
                    {option.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
