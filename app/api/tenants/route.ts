import { NextResponse } from "next/server"

export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        rooms: true,
      },
    })
    return NextResponse.json(tenants)
  } catch (error) {
    console.error("Failed to fetch tenants:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, type, details } = await request.json()
    const newTenant = await prisma.tenant.create({
      data: { name, type, details },
    })
    return NextResponse.json(newTenant)
  } catch (error) {
    console.error("Failed to create tenant:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

