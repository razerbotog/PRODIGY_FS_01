import { connectDB } from "app/lib/db"
import { hashPassword } from "app/lib/hash"
import User from "app/models/User"
import { NextResponse } from "next/server"

export async function POST(req: Request){
  await connectDB();
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({error: "Name, Email and Password required"}, {status: 400})
  }
  const existingUser = await User.findOne({email})
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }
  const hashed = await hashPassword(password);
  await User.create({name, email, password: hashed});
  return NextResponse.json({ message: "Registered successfully" }, {status: 200});
}