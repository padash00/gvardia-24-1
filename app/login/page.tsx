"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { username, password: "***" })

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      console.log("Response status:", response.status)

      const textResponse = await response.text()
      console.log("Raw response:", textResponse)

      let data
      try {
        data = JSON.parse(textResponse)
      } catch (parseError) {
        console.error("Error parsing response:", parseError)
        throw new Error(`Ошибка сервера: неверный формат ответа. Текст ответа: ${textResponse}`)
      }

      console.log("Parsed response data:", data)

      if (response.ok && data.success) {
        console.log("Login successful, redirecting to dashboard")
        localStorage.setItem("username", data.username)
        localStorage.setItem("role", data.role)
        let dashboardRoute
        switch (data.role) {
          case "admin":
            dashboardRoute = "/admin-dashboard"
            break
          case "owner":
            dashboardRoute = "/owner-dashboard"
            break
          case "manager":
            dashboardRoute = "/manager-dashboard"
            break
          default:
            dashboardRoute = "/"
        }
        router.push(dashboardRoute)
      } else {
        console.error("Login failed:", data)
        setError(data.message || "Произошла ошибка при входе")
      }
    } catch (err) {
      console.error("Login error:", err)
      if (err instanceof Error) {
        console.error("Error name:", err.name)
        console.error("Error message:", err.message)
        console.error("Error stack:", err.stack)
      }
      setError(
        err instanceof Error
          ? err.message
          : "Произошла неизвестная ошибка при входе. Пожалуйста, попробуйте снова позже.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Вход в систему</CardTitle>
          <CardDescription>Введите свои учетные данные для входа</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Введите имя пользователя"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>
                  {error}
                  {error.includes("неверный формат ответа") && (
                    <p className="mt-2 text-sm">Пожалуйста, сообщите об этой ошибке администратору системы.</p>
                  )}
                </AlertDescription>
              </Alert>
            )}
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Alert className="mt-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Доступные учетные записи для тестирования:</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside">
                <li>Админ: admin / admin</li>
                <li>Владелец: owner / owner123</li>
                <li>Менеджер: manager / manager123</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}

