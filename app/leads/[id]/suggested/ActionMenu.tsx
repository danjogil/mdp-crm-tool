"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ActionMenu = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-[-35px] md:ml-0">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 dark:hover:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-300 "
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50"
      >
        <Link href={`/properties/${id}`}>
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-zinc-800 dark:focus:text-zinc-50">
            Open
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
