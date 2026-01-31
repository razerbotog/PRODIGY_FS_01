"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    console.log("clicked handlelogin");
    
try {
      await fetch("/api/auth/login", {
      method: "GET",
      // method: "POST",
      // body: JSON.stringify({ email, password }),
    })
} catch (error) {
  console.log(error);
  
}
  }

  return (
    <>
    <input type="text" value={email} onChange={(e)=> setEmail(e.target.value) } /> Email
    <input type="text" value={password} onChange={(e)=> setPassword(e.target.value) } /> Password
    <button onClick={handleLogin}>
      Login
    </button>
    <Button onClick={handleLogin}>Hi</Button>
    </>
  )
}
