"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import EditTaskModal from "../EditTaskModal";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-xl font-light text-zinc-100">Tasks</div>,
    cell: ({ row }) => {
      const task = row.original;
      const title: string = row.getValue("title");

      return <EditTaskModal task={task}>{title}</EditTaskModal>;
    },
  },
];
