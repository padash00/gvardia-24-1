import { useState, useEffect, useMemo } from "react"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true)
      const mockTenants: Tenant[] = [
        { id: 1, name: "Арендатор 1", room: "101" },
        { id: 2, name: "Арендатор 2", room: "102" },
        { id: 3, name: "Арендатор 3", room: "201" },
        { id: 4, name: "Арендатор 4", room: "202" },
        { id: 5, name: "Арендатор 5", room: "301" },
      ]

      const filteredTenants = mockTenants.filter((tenant) => {
        const roomNumber = Number.parseInt(tenant.room)
        return !isNaN(roomNumber) && Math.floor(roomNumber / 100) === floor
      })

      setTenants(filteredTenants)
      setLoading(false)
    }

    fetchTenants()
  }, [floor])

  const floorName = useMemo(() => {
    switch (floor) {
      case 0:
        return "подвале"
      case 1:
        return "1 этаже"
      case 2:
        return "2 этаже"
      case 3:
        return "3 этаже"
      default:
        return `${floor} этаже`
    }
  }, [floor])

  return (
    <div className={styles.tenantListContainer}>
      <h2>Арендаторы на {floorName}</h2>
      {loading ? (
        <p className={styles.loading}>Загрузка...</p>
      ) : tenants.length > 0 ? (
        <ul className={styles.tenantList}>
          {tenants.map((tenant) => (
            <li key={tenant.id} className={styles.tenantItem}>
              <span>{tenant.name}</span>
              <span>Кабинет: {tenant.room}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noTenants}>Нет арендаторов на этом этаже</p>
      )}
    </div>
  )
}

export default TenantList
