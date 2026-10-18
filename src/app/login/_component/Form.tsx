import { cn } from "cn"

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
import Link from "next/link"
import { PlanId, UserProfile, STORAGE_KEY } from "@/lib/user"
import { useRouter } from "next/navigation"
import { useState } from "react"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      let user: UserProfile | null = null

      if (raw) {
        try {
          const parsed: unknown = JSON.parse(raw);

          if (
            typeof parsed !== "object" ||
            parsed === null ||
            !("id" in parsed) ||
            !("name" in parsed) ||
            !("email" in parsed) ||
            !("planId" in parsed) ||
            typeof parsed.id !== "string" ||
            typeof parsed.name !== "string" ||
            typeof parsed.email !== "string" ||
            !["free", "basic-arithmetic", "pre-algebra", "algebra-1"].includes(String(user?.planId || "free"))
          ) {
            user = parsed as UserProfile
          }
        } catch {
          //
        }
      }

      if (user && user.email.toLowerCase() !== normalizedEmail) {
        setError("Profile not found on demo profile.");
        return;
      }
      if (!user) {
        user = {
          id: crypto.randomUUID(),
          name: normalizedEmail.split("@")[0],
          email: normalizedEmail,
          planId: "free"
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      }

      router.push("/calc");
    } catch {
      setError("Could not access local storage, check your browser settings");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription className="text-md">
            Login into your account!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // password doesnt really matter we'll just log them in
                />
              </Field>
              <Field>
                <Button variant="destructive" type="submit" >Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="#">Sign up</Link>
                </FieldDescription>
              </Field>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
