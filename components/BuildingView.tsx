import { useState } from "react"
import styles from "../styles/BuildingView.module.css"

interface BuildingViewProps {
  onFloorSelect: (floor: number) => void
}

const BuildingView: React.FC<BuildingViewProps> = ({ onFloorSelect }) => {
  const [activeFloor, setActiveFloor] = useState(0)

  const handleFloorClick = (floor: number) => {
    setActiveFloor(floor)
    onFloorSelect(floor)
  }

  const getFloorName = (floor: number) => {
    switch (floor) {
      case 0:
        return "Подвал"
      case 1:
        return "1 этаж"
      case 2:
        return "2 этаж"
      case 3:
        return "3 этаж"
      default:
        return `${floor} этаж`
    }
  }

  return (
    <div className={styles.buildingContainer}>
      <h2>Вид здания</h2>
      <div className={styles.building}>
        {[3, 2, 1, 0].map((floor) => (
          <div
            key={floor}
            className={`${styles.floor} ${activeFloor === floor ? styles.active : ""}`}
            onClick={() => handleFloorClick(floor)}
          >
            {getFloorName(floor)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuildingView

