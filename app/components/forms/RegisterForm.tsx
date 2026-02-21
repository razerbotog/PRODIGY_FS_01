"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

      const handleSubmit = async (e: React.FormEvent)=>{
            e.preventDefault()
    setLoading(true)
        const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    console.log(res);
        if (res.ok) {
       setLoading(false)
      router.push(`/login?email=${encodeURIComponent(email)}`)
    } else {
      setLoading(false)
      const data = await res.json()
      alert(data.message)
    }
      }

    return (
    <form onSubmit={handleSubmit}>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" value={name} onChange={(e)=>setName(e.target.value)} />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
          className="bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
        <Input
          id="fieldgroup-password"
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <FieldDescription>
          We&apos;ll send updates to this address.
        </FieldDescription> */}
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Register {loading && <Spinner />}</Button>
      </Field>
      <Field orientation="horizontal">
        <FieldDescription>
          Already have an account.
        <Link href={"/login"} type="button" className="text-white pr-0 pl-1" >
          Login
        </Link> now!
        </FieldDescription>

      </Field>
      
    </FieldGroup>
    </form>
  )
}
