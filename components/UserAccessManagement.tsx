"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { users } from "@/utils/mockData"

interface UserAccess {
  id: number
  username: string
  role: string
  canViewFinancials: boolean
  canManageUsers: boolean
  canManageBuildings: boolean
  canManageContracts: boolean
}

const UserAccessManagement: React.FC = () => {
  const [userAccess, setUserAccess] = useState<UserAccess[]>(
    users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      canViewFinancials: user.role === "owner" || user.role === "admin",
      canManageUsers: user.role === "owner" || user.role === "admin",
      canManageBuildings: user.role === "owner" || user.role === "admin" || user.role === "manager",
      canManageContracts: user.role === "owner" || user.role === "admin" || user.role === "manager",
    })),
  )

  const handleAccessChange = (userId: number, accessType: keyof UserAccess) => {
    setUserAccess((prevAccess) =>
      prevAccess.map((user) => (user.id === userId ? { ...user, [accessType]: !user[accessType] } : user)),
    )
  }

  const saveChanges = () => {
    // В реальном приложении здесь был бы API-запрос для сохранения изменений
    console.log("Сохраненные изменения:", userAccess)
    alert("Изменения сохранены")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление правами доступа пользователей</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Просмотр финансов</TableHead>
              <TableHead>Управление пользователями</TableHead>
              <TableHead>Управление зданиями</TableHead>
              <TableHead>Управление договорами</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAccess.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.canViewFinancials}
                    onCheckedChange={() => handleAccessChange(user.id, "canViewFinancials")}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.canManageUsers}
                    onCheckedChange={() => handleAccessChange(user.id, "canManageUsers")}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.canManageBuildings}
                    onCheckedChange={() => handleAccessChange(user.id, "canManageBuildings")}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.canManageContracts}
                    onCheckedChange={() => handleAccessChange(user.id, "canManageContracts")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={saveChanges} className="mt-4">
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  )
}

export default UserAccessManagement

