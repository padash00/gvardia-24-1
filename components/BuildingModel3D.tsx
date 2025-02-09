"use client"

import React, { useState, useRef, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import type * as THREE from "three"

/** Опционально можно определить структуру RoomData, если надо расширять её дальше. */
export interface RoomData {
  number: string
  tenant: string | null
}

/** Интерфейс для описания этажа и связанных кабинетов. */
export interface FloorData {
  floorNumber: number
  rooms: RoomData[]
}

/** Основной интерфейс пропсов для BuildingModel3D. */
export interface BuildingModelProps {
  /** Список этажей вместе с кабинетами. */
  floors: FloorData[]
  /** Колбэк, который вызывается при клике по этажу. */
  onFloorSelect: (floor: FloorData) => void
}

/** 
 * Компонент для рендеринга одного этажа в 3D.
 * При клике (onClick) выделяем этаж, анимация простая (пульсирует).
 */
interface FloorProps {
  position: [number, number, number]  // Координаты
  color: string                       // Цвет
  isSelected: boolean                 // Флаг, что этаж выделен
  onClick: () => void                 // Обработчик клика
}

const Floor: React.FC<FloorProps> = memo(({ position, color, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (isSelected && meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      )
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1)
    }
  })

  return (
    <mesh position={position} onClick={onClick} ref={meshRef}>
      <boxGeometry args={[4, 1, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
})

Floor.displayName = "Floor"

/** 
 * Внутренний компонент для рендеринга «коробок-этажей» + текстовых меток.
 */
const BuildingModel: React.FC<BuildingModelProps> = memo(({ floors, onFloorSelect }) => {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)

  const handleFloorClick = (floorNumber: number) => {
    setSelectedFloor(floorNumber)
    const floorData = floors.find((f) => f.floorNumber === floorNumber)
    if (floorData) {
      onFloorSelect(floorData)
    }
  }

  return (
    <group>
      {floors.map((floor, index) => {
        const isSelected = selectedFloor === floor.floorNumber
        return (
          <React.Fragment key={floor.floorNumber}>
            <Floor
              position={[0, index * 1.2, 0]}
              color={isSelected ? "#ff6b6b" : "#4ecdc4"}
              isSelected={isSelected}
              onClick={() => handleFloorClick(floor.floorNumber)}
            />
            <Text
              position={[2.5, index * 1.2, 0]}
              fontSize={0.5}
              color="black"
              anchorX="left"
            >
              {`Этаж ${floor.floorNumber}`}
            </Text>
          </React.Fragment>
        )
      })}
    </group>
  )
})

BuildingModel.displayName = "BuildingModel"

/**
 * Основной экспортируемый компонент,
 * содержит <Canvas> и управляет 3D моделью здания.
 */
const BuildingModel3D: React.FC<BuildingModelProps> = ({ floors, onFloorSelect }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas
        camera={{ position: [10, 5, 10], fov: 60 }}
        style={{ background: "#f0f0f0" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BuildingModel floors={floors} onFloorSelect={onFloorSelect} />
        {/* 
         * Если вам нужно разрешить пользователям зум и панорамирование, 
         * установите соответствующие флаги в true:
         * <OrbitControls enablePan enableZoom />
         */}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default BuildingModel3D
