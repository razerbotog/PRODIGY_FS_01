import mongoose, { Model } from "mongoose"
export interface IUser {
  name: string
  email: string
  password: string
  role: "user" | "admin"
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      select: false //to hide password by default when querying
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
)

const User: Model<IUser> =  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;