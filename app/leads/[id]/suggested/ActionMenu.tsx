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
        <AlertDialog>
          <AlertDialogTrigger className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-800 focus:text-zinc-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-zinc-50 w-full hover:bg-zinc-800">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[80%] rounded-md bg-zinc-900 border border-zinc-800 text-zinc-50">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500">
                This action cannot be undone. This will permanently delete this
                property.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-zinc-900 border border-zinc-700 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-zinc-50 text-zinc-900 hover:bg-zinc-300 hover:text-zinc-900"
                onClick={async () => {
                  await axios
                    .delete(`/api/properties/${id}`)
                    .then(() => {
                      toast.success("Property deleted!");
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
