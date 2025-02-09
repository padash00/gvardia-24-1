"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Backup {
  id: number
  date: string
  size: string
  status: "Успешно" | "В процессе" | "Ошибка"
}

const BackupManagement: React.FC = () => {
  const [backups, setBackups] = useState<Backup[]>([
    { id: 1, date: "2024-03-15 00:00:00", size: "1.2 GB", status: "Успешно" },
    { id: 2, date: "2024-03-16 00:00:00", size: "1.3 GB", status: "Успешно" },
    { id: 3, date: "2024-03-17 00:00:00", size: "1.2 GB", status: "Успешно" },
    { id: 4, date: "2024-03-18 00:00:00", size: "1.3 GB", status: "В процессе" },
  ])

  const [backupFrequency, setBackupFrequency] = useState("daily")

  const createBackup = () => {
    const newBackup: Backup = {
      id: backups.length + 1,
      date: new Date().toISOString().replace("T", " ").substr(0, 19),
      size: "1.3 GB",
      status: "В процессе",
    }
    setBackups([newBackup, ...backups])
  }

  const restoreBackup = (id: number) => {
    // В реальном приложении здесь был бы процесс восстановления
    console.log(`Восстановление из резервной копии ${id}`)
    alert(`Восстановление из резервной копии ${id} начато`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление резервным копированием</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={backupFrequency} onValueChange={setBackupFrequency}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Частота бэкапов" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Каждый час</SelectItem>
              <SelectItem value="daily">Ежедневно</SelectItem>
              <SelectItem value="weekly">Еженедельно</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={createBackup}>Создать резервную копию</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Размер</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>{backup.date}</TableCell>
                <TableCell>{backup.size}</TableCell>
                <TableCell>{backup.status}</TableCell>
                <TableCell>
                  <Button onClick={() => restoreBackup(backup.id)} disabled={backup.status !== "Успешно"}>
                    Восстановить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default BackupManagement

