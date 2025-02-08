import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const buildings = await prisma.building.findMany({
      include: {
        floors: {
          include: {
            rooms: {
              include: {
                tenant: true,
              },
            },
          },
        },
      },
    })
    return NextResponse.json(buildings)
  } catch (error) {
    console.error("Failed to fetch buildings:", error)
    return NextResponse.json(
      { error: "Failed to fetch buildings", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    const newBuilding = await prisma.building.create({
      data: { name },
    })
    return NextResponse.json(newBuilding)
  } catch (error) {
    console.error("Failed to create building:", error)
    return NextResponse.json(
      { error: "Failed to create building", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

