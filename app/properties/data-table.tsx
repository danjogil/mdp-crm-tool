"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
      sorting: [
        {
          id: "status",
          desc: false,
        },
      ],
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center z-20"
    >
      <div className="w-full max-w-6xl">
        <div className="w-full max-w-7xl">
          <h1 className="font-bold text-2xl sm:text-3xl text-neutral-50">
            Properties
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row py-4 space-y-4 sm:space-y-0 sm:items-center w-full sm:space-x-4">
          <div className="w-full">
            <Input
              placeholder="Filter location..."
              value={
                (table.getColumn("location")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
              className="bg-zinc-900 text-zinc-50 placeholder:text-zinc-300 border border-zinc-800 ring-offset-zinc-700 focus-visible:ring-0 ring-offset-0 transition duration-400"
            />
          </div>
          <div className="flex gap-4 items-center justify-between w-full">
            <Input
              placeholder="Filter price..."
              value={
                (table.getColumn("price")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("price")?.setFilterValue(event.target.value)
              }
              className="bg-zinc-900 text-zinc-50 placeholder:text-zinc-300 border border-zinc-800 ring-offset-zinc-700 focus-visible:ring-0 ring-offset-0 transition duration-400"
            />
            <Link href="/properties/new">
              <Button className="bg-neutral-50 text-zinc-900 hover:bg-neutral-300">
                Add property
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-md w-full bg-zinc-900 border border-zinc-800">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-zinc-900 border-zinc-800"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-zinc-50">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-zinc-800 border-zinc-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center hover:bg-zinc-900 bg-zinc-900"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-900"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-900"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
