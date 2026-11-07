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

export default function SignUp() {
  const router = useRouter()

  const [error, setError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleEmailSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError("")
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const { error: signUpError } = await authClient.signUp.email({
      name: String(formData.get("name") ?? ""),
      image: String(formData.get("image") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    })

    if (signUpError) {
      setError(signUpError.message || "Could not create your account.")
      setIsSubmitting(false)
      return
    }

    // Sign up succeeded — go to the homepage.
    router.replace("/")
  }

  return (
    <div className="flex flex-col gap-6 max-w-6x mx-auto my-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome To Helping Hand</CardTitle>
          <CardDescription>
            SignUp with Email And Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="image">ImageURL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Image"
                  required
                />
              </Field>
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
                  {isSubmitting ? "Signing up…" : "SignUp"}
                </Button>
                <FieldDescription className="text-center">
                  Have an account? <Link href="/login">Login</Link>
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
