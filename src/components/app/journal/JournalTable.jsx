import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { format } from "@formkit/tempo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../shadcn/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { m } from "../../../i18n/paraglide/messages";
import { useQuery } from "@tanstack/react-query";
import { kyAspDotnet } from "../../../api/ky";

const columns = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue("amount").toLocaleString()}</div>,
  },
  {
    accessorKey: "note",
    header: () => <div className="text-left">Note</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("note")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => <div className="text-right">{format(row.getValue("createdAt"), "DD/MM/YYYY, HH:mm:ss")}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Updated</div>,
    cell: ({ row }) => <div className="text-right">{format(row.getValue("updatedAt"), "DD/MM/YYYY, HH:mm:ss")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0 flex justify-center items-center">
              <MoreHorizontal className="size-6 text-blue-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-20">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(rowData.id)}
            >
              {m["common.edit"]()}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"
            >
              {m["common.delete"]()}
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];


export default function JournalTable({ data }) {
  // const getExpenses = useQuery({
  //   queryFn: async () => {
  //     return await kyAspDotnet.get("", {
        
  //     })
  //   }
  // })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
