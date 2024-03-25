"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import EditTaskModal from "../EditTaskModal";
import NewTaskModal from "../NewTaskModal";
import { IoMdAdd } from "react-icons/io";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: () => (
      <div className="flex justify-between items-center">
        <div className="text-xl font-light text-zinc-100">Tasks</div>
        <NewTaskModal>
          <IoMdAdd className="font-bold" size={18} />
        </NewTaskModal>
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      const title: string = row.getValue("title");

      return <EditTaskModal task={task}>{title}</EditTaskModal>;
    },
  },
];
