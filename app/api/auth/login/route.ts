import { connectDB } from "app/lib/db"
import { comparePassword, hashPassword } from "app/lib/hash";
import { signToken } from "app/lib/jwt";
import User from "app/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs"




export async function GET(request: Request) {
  console.log("inside get");

  try {
    await connectDB()
  } catch (error) {
    console.log(error);

  }


  //   const body = await request.json()

  //   await User.create(body)

  return Response.json({ success: true })
}

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Fill Email and Password" }, { status: 400 })
  }
  const user = await User.findOne({ email }).select("+password")

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: "Invalid Credentials!" }, { status: 400 })
  }
  const token = signToken({ id: user._id, email: user.email })

  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ message: "Logged In Successfully!" }, { status: 200 })

}