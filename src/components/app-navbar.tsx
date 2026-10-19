"use client"

import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Avatar } from "./ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  type NavbarProps,
  NavbarProvider,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar"
import root from "@/locales/root.json"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@heroui/react"
import { useCart } from "./cart-provider"
import { ShoppingBag, User } from "lucide-react"

type Routes = {
  label: string,
  href: string
}
export default function AppNavbar(props: NavbarProps) {
  const { cartTotal } = useCart()
  return (
    <NavbarProvider className="bg-stone-900">
      <Navbar {...props}>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto Home Page"
            href={root.routes[0].href}
          >
            <Avatar
              size="lg"
              className="outline-hidden bg-white w-10 h-10 items-center pl-0.5 border-cyan-300 border-2"
              src={root.Website.icon}
            />
            <span className="font-cm text-2xl underline italic">
              {root.Website.shortName}
            </span>
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          {root.routes.map((e: Routes, i) => {
            return (
              <NavbarItem key={i} href={e.href}>{e.label}</NavbarItem>
            )
          })}
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className=" max-md:hidden">
          <Link href="/login">

            <Button variant="default" size="sm" aria-label="Enter your account"className={"cursor-pointer"} >
              <User />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="default" size="sm" aria-label="Your Bag" className={"cursor-pointer"}>

            <Badge.Anchor>

              <ShoppingBag/>
              <Badge color="accent" size="sm">
                ${cartTotal.toFixed(2)}
              </Badge>
            </Badge.Anchor>
          </Button>
              </Link>
          <Separator orientation="vertical" className="mr-3 ml-1 h-5" />

        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <Link href="/login">

        <Button variant="default" size="sm" aria-label="Enter your account">
          <User />
        </Button>
        </Link>
        <Link href="/cart">

        <Button variant="default" size="sm" aria-label="Your Bag">
          <ShoppingBagIcon />
        </Button>
        </Link>
        <NavbarSeparator className="mr-2.5" />
      </NavbarMobile>
    </NavbarProvider>
  )
}
