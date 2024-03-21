"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionMenu from "./ActionMenu";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Lead = {
  id: string;
  name: string | null;
  number: string | null;
  email: string | null;
  date: string | null;
  nationality: string | null;
  type: string | null;
  budget: string | null;
  area: string | null;
  beds: string | null;
  property: string | null;
  extra: string | null;
  comment: string | null;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="font-small text-zinc-50">{name}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden md:flex md:items-center hover:text-zinc-400 cursor-pointer transition-colors"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");

      return (
        <div className="font-light text-zinc-300 hidden md:block">{date}</div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: () => <div className="hidden sm:block">Budget</div>,
    cell: ({ row }) => {
      const budget = parseFloat(row.getValue("budget"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(budget);

      return (
        <div className="font-small hidden text-zinc-50 sm:block">
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
        <div className="font-light text-zinc-300 hidden md:block">{area}</div>
      );
    },
  },
  {
    accessorKey: "beds",
    header: () => <div className="hidden md:block">Beds</div>,
    cell: ({ row }) => {
      const beds: string = row.getValue("beds");

      return (
        <div className="font-light text-zinc-300 hidden md:block">{beds}</div>
      );
    },
  },
  {
    accessorKey: "property",
    header: () => <div className="hidden md:block">Property</div>,
    cell: ({ row }) => {
      const property: string = row.getValue("property");

      return (
        <div className="font-light text-zinc-300 hidden md:block">
          {property}
        </div>
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
