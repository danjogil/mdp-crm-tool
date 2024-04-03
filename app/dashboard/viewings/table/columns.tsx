"use client";

import { Viewing } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdAdd } from "react-icons/io";

import EditViewingModal from "../EditViewingModal";
import NewViewingModal from "../NewViewingModal";

export const columns: ColumnDef<Viewing>[] = [
  {
    accessorKey: "title",
    header: () => (
      <div className="flex justify-between items-center">
        <div className="text-xl dark:font-base dark:text-zinc-100">
          Viewings
        </div>
        <NewViewingModal>
          <IoMdAdd className="font-bold" size={20} />
        </NewViewingModal>
      </div>
    ),
    cell: ({ row }) => {
      const viewing = row.original;
      const title: string = row.getValue("title");

      return (
        <div className="flex justify-between items-center gap-2">
          <EditViewingModal viewing={viewing}>{title}</EditViewingModal>
        </div>
      );
    },
  },
];
