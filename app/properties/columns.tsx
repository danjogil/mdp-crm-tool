"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionMenu from "./ActionMenu";

import { Property } from "@prisma/client";
import { ArrowUpDown } from "lucide-react";

import PropertyStatusSelect from "../components/PropertyStatusSelect";

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "location",
    header: () => <div>Location</div>,
    cell: ({ row }) => {
      const location: string = row.getValue("location");

      return <div className="font-small dark:text-zinc-50">{location}</div>;
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="hidden sm:block">Type</div>,
    cell: ({ row }) => {
      const type: string = row.getValue("type");

      return (
        <div className="font-light dark:text-zinc-300 hidden sm:block">
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center dark:hover:text-zinc-400 cursor-pointer transition-colors"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(price);

      return <div className="font-small dark:text-zinc-50">{formatted}</div>;
    },
  },
  {
    accessorKey: "propertyType",
    header: () => (
      <div>
        <p className="hidden md:block">Property Type</p>
        <p className="block md:hidden">Type</p>
      </div>
    ),
    cell: ({ row }) => {
      const propertyType: string = row.getValue("propertyType");

      return (
        <div className="md:font-light dark:text-zinc-300">{propertyType}</div>
      );
    },
  },
  {
    accessorKey: "beds",
    header: () => <div className="hidden md:block">Beds</div>,
    cell: ({ row }) => {
      const beds: string = row.getValue("beds");

      return (
        <div className="font-light dark:text-zinc-300 hidden sm:block">
          {beds}
        </div>
      );
    },
  },
  {
    accessorKey: "conditions",
    header: () => <div className="hidden md:block">Conditions</div>,
    cell: ({ row }) => {
      const conditions: string = row.getValue("conditions");

      return (
        <div className="font-light dark:text-zinc-300 hidden sm:block">
          {conditions}
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
        <PropertyStatusSelect
          id={id}
          status={status}
          className="hidden sm:flex"
        />
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
