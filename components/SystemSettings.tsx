"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SystemSettingsType {
  sessionTimeout: number
  maxLoginAttempts: number
  passwordExpirationDays: number
  enableTwoFactorAuth: boolean
  emailNotifications: boolean
  maintenanceMode: boolean
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettingsType>({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpirationDays: 90,
    enableTwoFactorAuth: false,
    emailNotifications: true,
    maintenanceMode: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: Number.parseInt(value, 10) }))
  }

  const handleSwitchChange = (name: keyof SystemSettingsType) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const saveSettings = () => {
    // В реальном приложении здесь был бы API-запрос для сохранения настроек
    console.log("Сохраненные настройки:", settings)
    alert("Настройки сохранены")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройка системных параметров</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="sessionTimeout">Тайм-аут сессии (минуты)</Label>
            <Input
              type="number"
              id="sessionTimeout"
              name="sessionTimeout"
              value={settings.sessionTimeout}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="maxLoginAttempts">Максимальное количество попыток входа</Label>
            <Input
              type="number"
              id="maxLoginAttempts"
              name="maxLoginAttempts"
              value={settings.maxLoginAttempts}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="passwordExpirationDays">Срок действия пароля (дни)</Label>
            <Input
              type="number"
              id="passwordExpirationDays"
              name="passwordExpirationDays"
              value={settings.passwordExpirationDays}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="enableTwoFactorAuth"
              checked={settings.enableTwoFactorAuth}
              onCheckedChange={() => handleSwitchChange("enableTwoFactorAuth")}
            />
            <Label htmlFor="enableTwoFactorAuth">Включить двухфакторную аутентификацию</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleSwitchChange("emailNotifications")}
            />
            <Label htmlFor="emailNotifications">Включить email-уведомления</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onCheckedChange={() => handleSwitchChange("maintenanceMode")}
            />
            <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
          </div>
          <Button type="button" onClick={saveSettings}>
            Сохранить настройки
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SystemSettings

