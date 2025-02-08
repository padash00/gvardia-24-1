// Определение типов
export interface User {
  id: number
  username: string
  password: string
  role: "owner" | "admin" | "manager"
}

export interface Room {
  id: number
  number: string
  area: number
  isOccupied: boolean
  tenant: string | null
}

export interface Floor {
  id: number
  number: number
  rooms: Room[]
}

export interface Building {
  id: number
  name: string
  floors: Floor[]
}

export interface Tenant {
  id: number
  name: string
  type: "ИП" | "ТОО"
  details: string
}

export interface FinancialData {
  date: string
  income: number
  expenses: number
}

export interface ExpenseCategory {
  name: string
  amount: number
}

// Моковые данные
export const users: User[] = [
  { id: 1, username: "owner", password: "owner123", role: "owner" },
  { id: 2, username: "admin", password: "admin", role: "admin" },
  { id: 3, username: "manager", password: "manager123", role: "manager" },
]

export const buildings: Building[] = [
  {
    id: 1,
    name: 'Бизнес-центр "Астана"',
    floors: [
      {
        id: 1,
        number: 1,
        rooms: [
          { id: 1, number: "101", area: 50, isOccupied: true, tenant: 'ООО "ТехноПром"' },
          { id: 2, number: "102", area: 75, isOccupied: false, tenant: null },
        ],
      },
      {
        id: 2,
        number: 2,
        rooms: [
          { id: 3, number: "201", area: 60, isOccupied: true, tenant: 'ИП "Иванов"' },
          { id: 4, number: "202", area: 80, isOccupied: true, tenant: 'АО "МегаСтрой"' },
        ],
      },
      {
        id: 3,
        number: 3,
        rooms: [
          { id: 5, number: "301", area: 70, isOccupied: false, tenant: null },
          { id: 6, number: "302", area: 65, isOccupied: true, tenant: 'ООО "ФинКонсалт"' },
        ],
      },
    ],
  },
]

export const tenants: Tenant[] = [
  { id: 1, name: 'ООО "ТехноПром"', type: "ТОО", details: "ИНН: 1234567890" },
  { id: 2, name: 'ИП "Иванов"', type: "ИП", details: "ИНН: 0987654321" },
  { id: 3, name: 'АО "МегаСтрой"', type: "ТОО", details: "ИНН: 1122334455" },
  { id: 4, name: 'ООО "ФинКонсалт"', type: "ТОО", details: "ИНН: 5544332211" },
]

export const financialData: FinancialData[] = [
  { date: "2024-01", income: 5000000, expenses: 2000000 },
  { date: "2024-02", income: 5200000, expenses: 1800000 },
  { date: "2024-03", income: 5500000, expenses: 2100000 },
]

export const expenseCategories: ExpenseCategory[] = [
  { name: "Коммунальные услуги", amount: 800000 },
  { name: "Ремонт", amount: 500000 },
  { name: "Налоги", amount: 400000 },
  { name: "Зарплаты", amount: 300000 },
  { name: "Прочее", amount: 100000 },
]

