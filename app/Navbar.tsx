"use client";

import { HiMenuAlt2 } from "react-icons/hi";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  return (
    <nav className="navbar bg-base-100 border-b shadow-sm fixed z-50">
      <div className="navbar-start">
        {currentUser && (
          <div role="button" className="btn btn-ghost lg:hidden">
            <Sheet>
              <SheetTrigger>
                <HiMenuAlt2 size={24} />
              </SheetTrigger>
              <SheetContent side="left">
                <ul className="flex flex-col mt-24 items-center gap-5">
                  <li className="w-full">
                    <Link
                      href="/dashboard"
                      className={`font-semibold text-xl btn btn-ghost w-full ${
                        pathname === "/dashboard" && "bg-neutral-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href=""
                      className={`font-semibold text-xl btn btn-ghost w-full ${
                        pathname === "/leads" && "bg-neutral-100"
                      }`}
                    >
                      Leads
                    </Link>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        )}
        <Link
          href={currentUser ? "/dashboard" : "/"}
          className="btn btn-ghost text-xl hidden sm:flex"
        >
          MDProperties
        </Link>
        <Link href="" className="btn btn-ghost text-xl flex sm:hidden">
          MDP
        </Link>
      </div>
      {currentUser && (
        <>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-3">
              <li>
                <Link
                  href="/dashboard"
                  className={`font-semibold text-lg ${
                    pathname === "/dashboard" && "bg-neutral-100"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className={`font-semibold text-lg ${
                    pathname === "/leads" && "bg-neutral-100"
                  }`}
                >
                  Leads
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <Link href="" className="btn">
              Add Lead
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
