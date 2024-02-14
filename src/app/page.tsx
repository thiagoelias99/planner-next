"use client"

import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data, status } = useSession()

  async function handleLoginClick() {
    await signIn()
  }

  async function handleLogoutClick() {
    await signOut()
  }

  return (
    <main>
      <Button onClick={handleLoginClick}>Login</Button>
      <Button onClick={handleLogoutClick}>Logout</Button>
      <h1>{data?.user?.email}</h1>
      <h1>{data?.user?.id}</h1>
    </main>
  )
}
