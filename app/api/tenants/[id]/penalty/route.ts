import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tenantId = Number.parseInt(params.id)
  const { amount } = await request.json()

  try {
    const updatedTenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        penalties: {
          create: {
            amount: amount,
          },
        },
      },
    })

    return NextResponse.json(updatedTenant)
  } catch (error) {
    console.error("Failed to add penalty:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

