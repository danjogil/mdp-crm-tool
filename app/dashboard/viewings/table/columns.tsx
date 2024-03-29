"use client";

import { Task, Viewing } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdAdd } from "react-icons/io";
import EditTaskModal from "../EditViewingModal";
import NewTaskModal from "../NewViewingModal";
import TaskStatusButton from "@/app/components/TaskStatusButton";

export const columns: ColumnDef<Viewing>[] = [
  {
    accessorKey: "lead",
    header: () => (
      <div className="flex justify-between items-center">
        <div className="text-xl dark:font-base dark:text-zinc-100">
          Viewings
        </div>
        <NewTaskModal>
          <IoMdAdd className="font-bold" size={20} />
        </NewTaskModal>
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      const title: string = row.getValue("title");

      return (
        <div className="flex justify-between items-center gap-2">
          {/* <EditTaskModal task={task}>{title}</EditTaskModal>
          <TaskStatusButton task={task} /> */}
        </div>
      );
    },
  },
];
