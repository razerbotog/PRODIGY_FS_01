import bcrypt from "bcryptjs"

export const hashPassword = (password: string) =>
  bcrypt.hash(password, 10)

export const comparePassword = async (p: string, h: string) =>
 await bcrypt.compare(p, h)
