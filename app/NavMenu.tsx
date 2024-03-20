"use client";

import { User } from "@prisma/client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { NextUIProvider } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavbarProps {
  currentUser?: User | null;
}

const NavMenu: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(currentUser ? "hello" : "bye");

  return (
    <NextUIProvider>
      <Navbar disableAnimation isBordered>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-inherit cursor-pointer"
              onClick={() =>
                currentUser ? router.push("/dashboard") : router.push("/")
              }
            >
              MDProperties
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="start">
          <NavbarBrand>
            <p
              className="font-bold text-inherit text-xl cursor-pointer"
              onClick={() =>
                currentUser ? router.push("/dashboard") : router.push("/")
              }
            >
              MDProperties
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname === "/dashboard"}>
            <Link
              href="/dashboard"
              className="hover:bg-neutral-200 transition-colors px-2 py-1 rounded-md"
            >
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/leads"}>
            <Link
              href="/leads"
              className="hover:bg-neutral-200 transition-colors px-2 py-1 rounded-md"
            >
              Leads
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link
              href="#"
              className="hover:bg-neutral-200 transition-colors px-2 py-1 rounded-md"
              onClick={() => signOut()}
            >
              Log out
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button>Add Lead</Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="w-full" href="/dashboard">
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" href="/leads">
              Leads
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full text-red-600"
              href="#"
              onClick={() => signOut()}
            >
              Log out
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </NextUIProvider>
  );
};

export default NavMenu;
