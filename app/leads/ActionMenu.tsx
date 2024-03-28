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
        <Link href={`/leads/${id}`}>
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-zinc-800 dark:focus:text-zinc-50">
            Open
          </DropdownMenuItem>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors dark:focus:bg-zinc-800 dark:focus:text-zinc-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full dark:hover:bg-zinc-800 hover:bg-slate-100">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[80%] rounded-md dark:bg-zinc-900 dark:border dark:border-zinc-800 dark:text-zinc-50">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="dark:text-zinc-500">
                This action cannot be undone. This will permanently delete this
                lead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:bg-zinc-900 dark:border dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:hover:text-zinc-900"
                onClick={async () => {
                  await axios
                    .delete(`/api/leads/${id}`)
                    .then(() => {
                      toast.success("Lead deleted!");
                      router.refresh();
                    })
                    .catch(() => {
                      toast.error("Something went wrong.");
                    });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
