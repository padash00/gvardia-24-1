import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "../styles/UserInfo.module.css"

interface User {
  username: string
  role: string
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])) as User
        setUser(decodedToken)
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  if (!user) return null

  return (
    <div className={styles.userInfo}>
      <p>Пользователь: {user.username}</p>
      <p>Роль: {user.role}</p>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Выйти
      </button>
    </div>
  )
}

export default UserInfo

