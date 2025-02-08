import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tenantId = Number.parseInt(params.id)
  const { status } = await request.json()

  try {
    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: { status },
    })

    return NextResponse.json(updatedTenant)
  } catch (error) {
    console.error("Failed to update tenant status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

