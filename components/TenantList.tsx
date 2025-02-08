import { useState, useEffect } from "react"
import styles from "../styles/TenantList.module.css"

interface Tenant {
  id: number
  name: string
  room: string
}

interface TenantListProps {
  floor: number
}

const TenantList: React.FC<TenantListProps> = ({ floor }) => {
  const [tenants, setTenants] = useState<Tenant[]>([])

  useEffect(() => {
    // В реальном приложении это был бы вызов API
    const fetchTenants = async () => {
      // Имитация вызова API с фиктивными данными
      const mockTenants: Tenant[] = [
        { id: 1, name: "Арендатор 1", room: "101" },
        { id: 2, name: "Арендатор 2", room: "102" },
        { id: 3, name: "Арендатор 3", room: "201" },
        { id: 4, name: "Арендатор 4", room: "202" },
        { id: 5, name: "Арендатор 5", room: "301" },
      ]
      setTenants(mockTenants.filter((tenant) => Math.floor(Number.parseInt(tenant.room) / 100) === floor))
    }

    fetchTenants()
  }, [floor])

  const getFloorName = (floor: number) => {
    switch (floor) {
      case 0:
        return "Подвале"
      case 1:
        return "1 этаже"
      case 2:
        return "2 этаже"
      case 3:
        return "3 этаже"
      default:
        return `${floor} этаже`
    }
  }

  return (
    <div className={styles.tenantListContainer}>
      <h2>Арендаторы на {getFloorName(floor)}</h2>
      <ul className={styles.tenantList}>
        {tenants.map((tenant) => (
          <li key={tenant.id} className={styles.tenantItem}>
            <span>{tenant.name}</span>
            <span>Кабинет: {tenant.room}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TenantList

