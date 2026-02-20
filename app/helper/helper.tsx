import { connectDB } from "app/lib/db";
import { verifyToken } from "app/lib/jwt"
import User from "app/models/User"

export async function getUserFromDB(token: string) {
    try {
        await connectDB();
           const payload = verifyToken(token) as { id: string }

    const user = await User.findById(payload.id).select("-password")



    return user 
    } catch (error) {
        console.log(error);
        
        return null
    }

}