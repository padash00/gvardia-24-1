import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export const useLogout = () => {
  const router = useRouter()
  const { toast } = useToast()

  const logout = () => {
    // Очищаем все данные пользователя из localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")

    // Отправляем запрос на сервер для инвалидации сессии
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        // Показываем уведомление об успешном выходе
        toast({
          title: "Выход из системы",
          description: "Вы успешно вышли из системы.",
        })
        // Перенаправляем на страницу входа
        router.push("/login")
      })
      .catch((error) => {
        console.error("Ошибка при выходе из системы:", error)
        // Показываем уведомление об ошибке
        toast({
          title: "Ошибка",
          description: "Произошла ошибка при выходе из системы.",
          variant: "destructive",
        })
      })
  }

  return logout
}

