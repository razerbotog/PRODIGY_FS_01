"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const passwordParam = searchParams.get("password")

    if (emailParam) setEmail(emailParam)
    if (passwordParam) setPassword(passwordParam)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    console.log(res);


    if (res.ok) {
      setLoading(false)
      router.push("/profile")
      router.refresh() // important
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
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
            className="bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
        </Field>
        <Field orientation="horizontal">
          <Button disabled={!email || !password} type="submit" >Login {loading && <Spinner />}</Button>
        </Field>
        <Field orientation="horizontal">
          <FieldDescription>
            Don't have an account.
            <Link href={"/register"} type="button" className="text-white pr-0 pl-1" >
              Register
            </Link> now!
          </FieldDescription>

        </Field>

      </FieldGroup>
    </form>
  )
}
