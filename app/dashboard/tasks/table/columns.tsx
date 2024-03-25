"use client";

import { TaskStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Tasks",
  },
];
