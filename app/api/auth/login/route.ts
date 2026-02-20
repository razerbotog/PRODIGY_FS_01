import { connectDB } from "app/lib/db"
import { comparePassword } from "app/lib/hash";
import { signToken } from "app/lib/jwt";
import User from "app/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and Password required" }, { status: 400 })
  }
  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: "Invalid Credentials!" }, { status: 400 })
  }
  const token = signToken({ id: user._id, email: user.email })

  const response = NextResponse.json({ message: "Logged In Successfully!" }, { status: 200 })

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response

}