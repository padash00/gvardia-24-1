import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { number, buildingId } = await request.json()
    const newFloor = await prisma.floor.create({
      data: { number, buildingId },
    })
    return NextResponse.json(newFloor)
  } catch (error) {
    console.error("Failed to create floor:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

