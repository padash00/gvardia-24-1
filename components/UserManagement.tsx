"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: number
  username: string
  role: string
  isBlocked: boolean
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "" })

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const fetchUsers = async () => {
      // Имитация загрузки данных
      const mockUsers: User[] = [
        { id: 1, username: "owner", role: "owner", isBlocked: false },
        { id: 2, username: "admin", role: "admin", isBlocked: false },
        { id: 3, username: "manager", role: "manager", isBlocked: false },
      ]
      setUsers(mockUsers)
    }

    fetchUsers()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleRoleChange = (value: string) => {
    setNewUser({ ...newUser, role: value })
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    // В реальном приложении здесь будет запрос к API для добавления пользователя
    const newUserWithId = { ...newUser, id: Date.now(), isBlocked: false } as User
    setUsers([...users, newUserWithId])
    setNewUser({ username: "", password: "", role: "" })
  }

  const handleToggleBlock = (id: number) => {
    // В реальном приложении здесь будет запрос к API для блокировки/разблокировки пользователя
    setUsers(users.map((user) => (user.id === id ? { ...user, isBlocked: !user.isBlocked } : user)))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Управление пользователями</h2>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Добавить пользователя</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить нового пользователя</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input id="username" name="username" value={newUser.username} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Роль</Label>
              <Select onValueChange={handleRoleChange} value={newUser.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Владелец</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                  <SelectItem value="manager">Менеджер</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Добавить</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя пользователя</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.isBlocked ? "Заблокирован" : "Активен"}</TableCell>
              <TableCell>
                <Button onClick={() => handleToggleBlock(user.id)} variant={user.isBlocked ? "default" : "destructive"}>
                  {user.isBlocked ? "Разблокировать" : "Заблокировать"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserManagement

