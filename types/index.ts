// Здание
export interface Building {
  id: number
  name: string
  floors: Floor[]
}

// Этаж
export interface Floor {
  id: number
  number: number
  rooms: Room[]
}

// Кабинет
export interface Room {
  id: number
  number: string
  floor: number
  area: number
  isOccupied: boolean
  tenant: Tenant | null
}

// Арендатор
export interface Tenant {
  id: number
  name: string
  type: "ИП" | "ТОО"
  details: string
  contracts: Contract[]
}

// Договор
export interface Contract {
  id: number
  tenantId: number
  roomId: number
  startDate: string
  endDate: string
  amount: number
  terms: string
}

// Платеж
export interface Payment {
  id: number
  contractId: number
  date: string
  amount: number
  status: "оплачено" | "не оплачено"
}

// Квитанция
export interface Receipt {
  id: number
  paymentId: number
  fileUrl: string
}

// Расход
export interface Expense {
  id: number
  date: string
  amount: number
  category: string
  description: string
}

// Пользователь системы
export interface User {
  id: number
  username: string
  role: "owner" | "admin" | "manager"
  isBlocked: boolean
}

