"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import type * as THREE from "three"

interface FloorData {
  floorNumber: number
  rooms: {
    number: string
    tenant: string | null
  }[]
}

interface BuildingModelProps {
  floors: FloorData[]
  onFloorSelect: (floor: FloorData) => void
}

const Floor: React.FC<{
  position: [number, number, number]
  color: string
  isSelected: boolean
  onClick: () => void
}> = ({ position, color, isSelected, onClick }) => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (isSelected) {
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.02)
    } else {
      mesh.current.scale.setScalar(1)
    }
  })

  return (
    <mesh position={position} onClick={onClick} ref={mesh}>
      <boxGeometry args={[4, 1, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const BuildingModel: React.FC<BuildingModelProps> = ({ floors, onFloorSelect }) => {
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
      {floors.map((floor, index) => (
        <Floor
          key={floor.floorNumber}
          position={[0, index * 1.2, 0]}
          color={selectedFloor === floor.floorNumber ? "#ff6b6b" : "#4ecdc4"}
          isSelected={selectedFloor === floor.floorNumber}
          onClick={() => handleFloorClick(floor.floorNumber)}
        />
      ))}
      {floors.map((floor, index) => (
        <Text key={`text-${floor.floorNumber}`} position={[2.5, index * 1.2, 0]} fontSize={0.5} color="black">
          {`Этаж ${floor.floorNumber}`}
        </Text>
      ))}
    </group>
  )
}

const BuildingModel3D: React.FC<BuildingModelProps> = ({ floors, onFloorSelect }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas camera={{ position: [10, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BuildingModel floors={floors} onFloorSelect={onFloorSelect} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default BuildingModel3D

