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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NextUIProvider } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

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
        className="bg-zinc-900 fixed border-b border-zinc-800"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle className="text-neutral-50" onClick={handleOpen} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p
              className="font-bold text-inherit cursor-pointer text-neutral-50"
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
              className="font-bold text-inherit text-xl cursor-pointer text-neutral-50"
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
              className={`hover:text-zinc-50 transition-colors px-2 py-1 rounded-md ${
                pathname === "/dashboard" ? "text-zinc-50" : "text-zinc-300"
              }`}
            >
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/leads"
              className={`hover:text-zinc-50 transition-colors px-2 py-1 rounded-md ${
                pathname === "/leads" ? "text-zinc-50" : "text-zinc-300"
              }`}
            >
              Tasks
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/leads"
              className={`hover:text-zinc-50 transition-colors px-2 py-1 rounded-md ${
                pathname === "/leads" ? "text-zinc-50" : "text-zinc-300"
              }`}
            >
              Leads
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/leads"
              className={`hover:text-zinc-50 transition-colors px-2 py-1 rounded-md ${
                pathname === "/leads" ? "text-zinc-50" : "text-zinc-300"
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
                "hover:text-zinc-50 transition-colors px-2 py-1 rounded-md text-zinc-300"
              }
              onClick={() => signOut()}
            >
              Log out
            </Link>
          </NavbarItem>
          <NavbarItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-neutral-50 text-zinc-900 hover:bg-neutral-300">
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-900 border border-zinc-800 text-zinc-50">
                <DropdownMenuItem
                  onClick={() =>
                    (
                      document.getElementById("my_modal") as HTMLDialogElement
                    ).showModal()
                  }
                  className="cursor-pointer"
                >
                  Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/leads/new")}
                  className="cursor-pointer"
                >
                  Lead
                </DropdownMenuItem>
                <DropdownMenuItem>Property</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-zinc-800">
          <NavbarMenuItem>
            <Link
              className="w-full text-zinc-50"
              href="/dashboard"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full text-zinc-50"
              href="/leads"
              onClick={() => setOpen(false)}
            >
              Tasks
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full text-zinc-50"
              href="/leads"
              onClick={() => setOpen(false)}
            >
              Leads
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link
              className="w-full text-zinc-50"
              href="/leads"
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
