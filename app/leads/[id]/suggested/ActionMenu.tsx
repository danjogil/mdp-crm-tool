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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ActionMenu = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-[-35px] md:ml-0">
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-50 hover:text-zinc-300 "
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-zinc-900 border-zinc-800 text-zinc-50"
      >
        <Link href={`/properties/${id}`}>
          <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800 focus:text-zinc-50">
            Open
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
