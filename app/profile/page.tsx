import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail } from "lucide-react";
import { getUserFromDB } from "app/helper/helper";
import { Button } from "@/components/ui/button";
import LogoutButton from "app/components/LogoutButton";

const Profile = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }
  console.log(token);
  
  const user = await getUserFromDB(token.value)
  console.log({user});
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h3 className='text-center text-2xl mb-3'>Secure User Authentication</h3>
        <Card>
          <CardContent>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" />
                  <AvatarFallback className="text-2xl">{user?.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                {/* <Button
                  size="icon"
                  variant="outline"
                  className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
                  <Camera />
                </Button> */}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <Badge variant="secondary">{user?.role}</Badge>
                </div>
                <p className="text-muted-foreground">Software Product Developer</p>
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="size-4" />
                      {user?.email}
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    San Francisco, CA
                  </div> */}
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                      {user?.createdAt.toLocaleString()}
                  </div>
                </div>
              </div>
              {/* <Button onClick={handleLogout} variant="destructive">Logout</Button> */}
              <LogoutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile