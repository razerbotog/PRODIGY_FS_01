import { connectDB } from "app/lib/db"
import { hashPassword } from "app/lib/hash"
import User from "app/models/User"
import { NextResponse } from "next/server"
export const runtime = "nodejs"




export async function GET(request: Request) {
  await connectDB()

//   const body = await request.json()

//   await User.create(body)

  return Response.json({ success: true })
}

export async function POST(req: Request){
  await connectDB();
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({error: "Fill Name, Email and Password"}, {status: 400})
  }
  const exist = await User.findOne({email})
  if (exist) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }
  const hashed = await hashPassword(password);
  await User.create({name, email, password: hashed});
  return NextResponse.json({ message: "Registered successfully" }, {status: 200});
}