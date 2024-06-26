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
import Link from "next/link";
import React from "react";

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
    <div className="relative flex flex-col gap-4 items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="w-full max-w-7xl">
          <h1 className="font-bold text-2xl sm:text-3xl dark:text-neutral-50">
            Properties
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row py-4 space-y-4 sm:space-y-0 sm:items-center w-full sm:space-x-4">
          <div className="flex gap-4 items-center justify-between w-full">
            <Input
              placeholder="Filter location..."
              value={
                (table.getColumn("location")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
              className="dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-300 border dark:border-zinc-800 dark:ring-offset-zinc-700 dark:focus-visible:ring-0 ring-offset-0 transition duration-400 shadow"
            />
            <Link href="/properties/new">
              <Button>Add property</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-md w-full dark:bg-zinc-900 border dark:border-zinc-800 shadow">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="dark:hover:bg-zinc-900 dark:border-zinc-800"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="dark:text-zinc-50">
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
                    className="dark:hover:bg-zinc-800 dark:border-zinc-800"
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
                    className="h-24 text-center dark:hover:bg-zinc-900 dark:bg-zinc-900"
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
            className="dark:bg-zinc-900 shadow"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-zinc-900 shadow"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
