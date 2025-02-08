import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { users } from "@/utils/mockData"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      return NextResponse.json({ success: false, message: "Неверное имя пользователя или пароль" }, { status: 401 })
    }

    const token = sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h" })

    const response = NextResponse.json(
      { success: true, token, role: user.role, username: user.username },
      { status: 200 },
    )

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })

    response.cookies.set("role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Произошла ошибка при обработке запроса" }, { status: 500 })
  }
}

