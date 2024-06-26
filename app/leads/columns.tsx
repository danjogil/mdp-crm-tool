"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionMenu from "./ActionMenu";

import { Status } from "@prisma/client";
import { ArrowUpDown } from "lucide-react";

import StatusSelect from "../components/StatusSelect";

type Lead = {
  id: string;
  name: string | null;
  number: string | null;
  email: string | null;
  date: string | null;
  nationality: string | null;
  status: Status;
  budgetFrom: number | null;
  budgetTo: number | null;
  lookingFor: string | null;
  area: string | null;
  beds: number | null;
  propertyType: string | null;
  extra: string | null;
  comment: string | null;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="font-small dark:text-zinc-50">{name}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex md:items-center dark:hover:text-zinc-400 cursor-pointer transition-colors"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");

      return (
        <div className="font-light dark:text-zinc-300 hidden md:block">
          {date}
        </div>
      );
    },
  },
  {
    accessorKey: "budgetTo",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex md:items-center dark:hover:text-zinc-400 cursor-pointer transition-colors"
        >
          Budget
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const budgetTo = parseFloat(row.getValue("budgetTo"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(budgetTo);

      return (
        <div className="font-small hidden dark:text-zinc-50 sm:block">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: () => <div className="hidden md:block">Area</div>,
    cell: ({ row }) => {
      const area: string = row.getValue("area");

      return (
        <div className="font-light dark:text-zinc-300 hidden md:block">
          {area}
        </div>
      );
    },
  },
  {
    accessorKey: "beds",
    header: () => <div className="hidden md:block">Beds</div>,
    cell: ({ row }) => {
      const beds: string = row.getValue("beds");

      return (
        <div className="font-light dark:text-zinc-300 hidden md:block">
          {beds}
        </div>
      );
    },
  },
  {
    accessorKey: "propertyType",
    header: () => <div className="hidden md:block">Property Type</div>,
    cell: ({ row }) => {
      const propertyType: string = row.getValue("propertyType");

      return (
        <div className="font-light dark:text-zinc-300 hidden md:block">
          {propertyType}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden sm:flex md:items-center dark:hover:text-zinc-400 cursor-pointer transition-colors"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const { id, status } = row.original;

      return (
        <StatusSelect id={id} status={status} className="hidden sm:flex" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return <ActionMenu id={id} />;
    },
  },
];
