import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useLogout } from "@/utils/auth"

interface HeaderProps {
  role: string
  showLogoutButton?: boolean
}

export default function Header({ role, showLogoutButton = true }: HeaderProps) {
  const logout = useLogout()

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Система управления арендой</h1>
      <div className="flex items-center gap-4">
        <span>Роль: {role}</span>
        {showLogoutButton && (
          <Button variant="secondary" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Выйти
          </Button>
        )}
      </div>
    </header>
  )
}

