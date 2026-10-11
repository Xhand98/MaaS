"use client"

import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
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

type Routes = {
  label: string,
  href: string
}
export default function AppNavbar(props: NavbarProps) {
  return (
    <NavbarProvider>
      <Navbar {...props}>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto Home Page"
            href={root.routes[0].href}
          >
            <Avatar
              isSquare
              size="md"
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
        <NavbarSection className="max-md:hidden">
          <Button intent="plain" size="sq-sm" aria-label="Search for products">
            <MagnifyingGlassIcon />
          </Button>
          <Button intent="plain" size="sq-sm" aria-label="Your Bag">
            <ShoppingBagIcon />
          </Button>
          <Separator orientation="vertical" className="mr-3 ml-1 h-5" />

        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <Button intent="plain" size="sq-sm" aria-label="Search for products">
          <MagnifyingGlassIcon />
        </Button>
        <Button intent="plain" size="sq-sm" aria-label="Your Bag">
          <ShoppingBagIcon />
        </Button>
        <NavbarSeparator className="mr-2.5" />
      </NavbarMobile>
    </NavbarProvider>
  )
}
