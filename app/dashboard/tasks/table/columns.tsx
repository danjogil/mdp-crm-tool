"use client";

import { Task } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { IoMdAdd } from "react-icons/io";
import EditTaskModal from "../EditTaskModal";
import NewTaskModal from "../NewTaskModal";
import TaskStatusButton from "@/app/components/TaskStatusButton";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: () => (
      <div className="flex justify-between items-center">
        <div className="text-xl dark:font-base dark:text-zinc-100">Tasks</div>
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
          <EditTaskModal task={task}>{title}</EditTaskModal>
          <TaskStatusButton task={task} />
        </div>
      );
    },
  },
];
