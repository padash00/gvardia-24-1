import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { number, area, floorId } = await request.json()
    const newRoom = await prisma.room.create({
      data: { number, area, floorId },
    })
    return NextResponse.json(newRoom)
  } catch (error) {
    console.error("Failed to create room:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

