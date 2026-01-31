import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { verifyToken } from "app/lib/jwt"
import User from "app/models/User"
import { connectDB } from "app/lib/db"

export async function GET() {
  try {
    await connectDB()

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const payload = verifyToken(token) as { id: string }
    
    const user = await User.findById(payload.id).select("-password")

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    )
  }
}
