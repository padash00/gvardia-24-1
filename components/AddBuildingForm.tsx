"use client"
import React, { useState, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface AddBuildingFormProps {
  /** Функция, которая вызывается при сабмите формы, передаёт название здания */
  onAddBuilding: (buildingName: string) => void
}

const AddBuildingForm: React.FC<AddBuildingFormProps> = ({ onAddBuilding }) => {
  const [buildingName, setBuildingName] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (buildingName.trim()) {
      onAddBuilding(buildingName.trim())
      setBuildingName("") // Сбросить поле
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="buildingName">Название здания</Label>
        <Input
          id="buildingName"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Добавить</Button>
    </form>
  )
}

export default AddBuildingForm
