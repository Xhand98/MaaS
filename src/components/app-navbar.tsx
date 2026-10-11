"use client"

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Avatar } from "@/components/ui/avatar"
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
import { Separator } from "@/components/ui/separator"
import root from "@/locales/root.json"

type Route = {
  label: string,
  href: string
};

export default function AppNavbar(props: NavbarProps) {
  return (
    <NavbarProvider>
      <Navbar {...props}>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium text-2xl"
            aria-label={"Icon of " + root.Website.shortName}
          >
            <Avatar
              isSquare
              size="sm"
              className="outline-hidden"
              src={root.Website.icon}
            />
            <span>
              {root.Website.shortName}
            </span>
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          {root.routes.map((e: Route) => {
            return (
              <NavbarItem href={e.href}>{e.label}</NavbarItem>
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
