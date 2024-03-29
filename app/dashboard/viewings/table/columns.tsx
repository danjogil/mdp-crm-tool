"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdAdd } from "react-icons/io";

import NewViewingModal from "../NewViewingModal";

export const columns: ColumnDef<Task>[] = [
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
      const task = row.original;
      const title: string = row.getValue("title");

      return (
        <div className="flex justify-between items-center gap-2">
          {/* <EditTaskModal task={task}>{title}</EditTaskModal>
           */}
        </div>
      );
    },
  },
];
