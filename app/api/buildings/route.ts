import { NextResponse } from "next/server"
import { buildings } from "@/utils/mockData"

export async function GET() {
  return NextResponse.json(buildings)
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 })
    }
    const newBuilding = {
      id: Math.max(0, ...buildings.map(b => b.id)) + 1,
      name,
      floors: [],
    }
    buildings.push(newBuilding)
    return NextResponse.json(newBuilding, { status: 201 })
  } catch (error) {
    console.error("Failed to create building:", error)
    return NextResponse.json(
      { error: "Failed to create building", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

