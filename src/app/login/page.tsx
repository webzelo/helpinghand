"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export default function Login() {
  const router = useRouter()

  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleEmailLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError("")
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const { error: loginError } = await authClient.signIn.email({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    })

    if (loginError) {
      setError(loginError.message || "Invalid email or password.")
      setIsSubmitting(false)
      return
    }

    // Login succeeded — go to the homepage.
    router.replace("/")
  }

  return (
    <div className="flex flex-col gap-6 max-w-6x mx-auto my-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome To Helping Hand</CardTitle>
          <CardDescription>
            Login with Email And Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in…" : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">SignUp</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
