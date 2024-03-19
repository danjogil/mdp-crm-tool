import { HiMenuAlt2 } from "react-icons/hi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 border-b shadow-sm fixed z-50">
      <div className="navbar-start">
        <div role="button" className="btn btn-ghost lg:hidden">
          <Sheet>
            <SheetTrigger>
              <HiMenuAlt2 size={24} />
            </SheetTrigger>
            <SheetContent side="left">
              <ul className="flex flex-col mt-24 items-center gap-5">
                <li className="w-full">
                  <Link
                    href=""
                    className="font-semibold text-xl btn btn-ghost w-full"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href=""
                    className="font-semibold text-xl btn btn-ghost w-full"
                  >
                    Leads
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        <Link href="" className="btn btn-ghost text-xl hidden sm:flex">
          MDProperties
        </Link>
        <Link href="" className="btn btn-ghost text-xl flex sm:hidden">
          MDP
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">
          <li>
            <Link href="" className="font-semibold text-lg">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="" className="font-semibold text-lg">
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
    </nav>
  );
};

export default Navbar;
