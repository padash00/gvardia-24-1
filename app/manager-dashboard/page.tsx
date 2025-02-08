"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ManagerDashboard() {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    const storedRole = localStorage.getItem("role")

    if (!storedUsername || storedRole !== "manager") {
      router.push("/login")
    } else {
      setUsername(storedUsername)
    }
  }, [router])

  if (!username) {
    return null // или можно отобразить загрузку
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header role="Менеджер" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Панель управления менеджера</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Регистрация платежей</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Регистрация платежей</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Загрузка договоров</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Загрузка договоров</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Загрузка квитанций</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Загрузка квитанций</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Список арендаторов</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Просмотр списка</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Генерация квитанций</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Генерация квитанций</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

