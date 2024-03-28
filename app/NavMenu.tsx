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
import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";

interface NavbarProps {
  currentUser?: User | null;
}

const NavMenu: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    !isOpen ? setOpen(true) : setOpen(false);
  };

  return (
    <NextUIProvider>
      <Navbar
        maxWidth="xl"
        shouldHideOnScroll
        isMenuOpen={isOpen}
        className="dark:bg-zinc-900 fixed border-b dark:border-zinc-800"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            className="dark:text-neutral-50"
            onClick={handleOpen}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-inherit cursor-pointer dark:text-neutral-50"
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
              className="font-bold text-inherit text-xl cursor-pointer dark:text-neutral-50"
              onClick={() =>
                currentUser ? router.push("/dashboard") : router.push("/")
              }
            >
              MDProperties
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link
              href="/dashboard"
              className={`dark:hover:text-zinc-50 hover:text-slate-900 text-slate-500 transition-colors px-2 py-1 rounded-md ${
                pathname === "/dashboard"
                  ? "dark:text-zinc-50 text-slate-900 font-medium"
                  : "dark:dark:text-zinc-300"
              }`}
            >
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/leads"
              className={`dark:hover:text-zinc-50 hover:text-slate-900 text-slate-500 transition-colors px-2 py-1 rounded-md ${
                pathname === "/leads"
                  ? "dark:text-zinc-50 text-slate-900 font-medium"
                  : "dark:text-zinc-300"
              }`}
            >
              Leads
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/properties"
              className={`dark:hover:text-zinc-50 hover:text-slate-900 text-slate-500 transition-colors px-2 py-1 rounded-md ${
                pathname === "/properties"
                  ? "dark:text-zinc-50 text-slate-900 font-medium"
                  : "dark:text-zinc-300"
              }`}
            >
              Properties
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link
              href="#"
              className={
                "dark:hover:text-zinc-50 text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded-md dark:text-zinc-300"
              }
              onClick={() => signOut()}
            >
              Log out
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <ModeToggle />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="dark:bg-zinc-800">
          <NavbarMenuItem>
            <Link
              className="w-full dark:text-zinc-50"
              href="/dashboard"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full dark:text-zinc-50"
              href="/leads"
              onClick={() => setOpen(false)}
            >
              Leads
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full dark:text-zinc-50"
              href="/properties"
              onClick={() => setOpen(false)}
            >
              Properties
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full text-red-600"
              href="#"
              onClick={() => {
                signOut();
                setOpen(false);
              }}
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
