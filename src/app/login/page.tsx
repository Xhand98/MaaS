"use client"

import { LoginForm } from "./_component/Form"
import { Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 text-4xl self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Avatar
              size="lg"
              className="outline-hidden bg-white w-10 h-10 items-center pl-0.5 border-cyan-300 border-2 mr-2"
              src="/logo.svg"
            />
          </div>
          Maas Inc.
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
