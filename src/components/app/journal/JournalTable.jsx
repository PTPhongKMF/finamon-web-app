import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { format, monthEnd, monthStart } from "@formkit/tempo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { m } from "../../../i18n/paraglide/messages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { kyAspDotnet } from "../../../api/ky";
import { useUserStore } from "../../../stores/userStore";
import { useAppDateStore, useAppTableStore } from "../../../stores/appJournalStore";
import { useShallow } from "zustand/shallow";
import clsx from "clsx";
import { useState } from "react";
import { formatVND } from "../../../utils/formatter";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../shadcn/alert-dialog";

export default function JournalTable() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({})

  const user = useUserStore(state => state.user);
  const selectedMonthYear = useAppDateStore(state => state.selectedMonthYear);

  const { PageNumber, PageSize, SortBy, SortDescending, setPageNumber, setPageSize, setSortBy, setSortDescending } = useAppTableStore(useShallow((state) => ({
    PageNumber: state.PageNumber,
    PageSize: state.PageSize,
    SortBy: state.SortBy,
    SortDescending: state.SortDescending,
    setPageNumber: state.setPageNumber,
    setPageSize: state.setPageSize,
    setSortBy: state.setSortBy,
    setSortDescending: state.setSortDescending
  })));

  const fetchExpenses = useQuery({
    queryKey: ["getExpenses", user.id, selectedMonthYear, PageNumber, PageSize, SortBy, SortDescending],
    queryFn: async () => {
      return await kyAspDotnet.get(`api/expense/user/${user.id}`, {
        searchParams: {
          StartDate: monthStart(selectedMonthYear).toISOString(),
          EndDate: monthEnd(selectedMonthYear).toISOString(),
          PageNumber,
          PageSize,
          SortBy,
          SortDescending
        }
      }).json()
    }
  })

  const deleteExpense = useMutation({
    mutationFn: async (id) => {
      return await kyAspDotnet.delete(`api/expense/${id}`).json()
    },
    onSuccess: fetchExpenses.refetch
  })

  if (fetchExpenses.isPending)
    return (
      <div className="flex justify-center items-center space-x-1 min-h-50">
        <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="size-4 bg-gray-400 rounded-full animate-bounce"></span>
      </div>
    )
  else return (
    <>
      {fetchExpenses.isError && (
        <p className="text-red-500 font-semibold mb-4">
          {fetchExpenses.error.message}
        </p>
      )}
      {deleteExpense.isError && (
        <p className="text-red-500 font-semibold mb-4">
          {deleteExpense.error.message}
        </p>
      )}

      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%] break-all">{m["app.expenses"]()}</TableHead>
              <TableHead className="w-[10%] text-right">{m["common.amount"]()}</TableHead>
              <TableHead className="w-[15%] break-all">{m["app.category"]()}</TableHead>
              <TableHead className="w-[30%] break-all">{m["common.note"]()}</TableHead>
              <TableHead className="w-[20%] text-right">{m["common.createdAt"]()}</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(fetchExpenses.isSuccess && fetchExpenses?.data?.items?.length > 0) ? (
              fetchExpenses.data.items.map((expense, index) => (
                <TableRow key={expense.id} className={clsx(
                  "hover:bg-amber-100",
                  index % 2 === 0 && "bg-gray-200"
                )}>
                  <TableCell className="break-all">{expense.name}</TableCell>
                  <TableCell className="text-right">{expense.amount.toLocaleString()}</TableCell>
                  <TableCell className="break-all">{expense.categoryName}</TableCell>
                  <TableCell className="break-all text-xs">
                    <div className="max-h-16 overflow-y-auto break-all whitespace-pre-wrap">
                      {expense.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{format(expense.date, "DD/MM/YYYY, HH:mm:ss")}</TableCell>
                  <TableCell>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 p-0 flex justify-center items-center rounded-full hover:bg-amber-200 cursor-pointer">
                          <MoreHorizontal className="size-6 text-blue-500" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-20">
                        <DropdownMenuItem className="cursor-pointer"
                          onClick={() => navigator.clipboard.writeText(expense.id)}
                        >
                          {m["common.edit"]()}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 cursor-pointer"
                          onClick={() => {setSelectedExpense({
                            id: expense.id,
                            name: expense.name,
                            amount: formatVND(parseInt(expense.amount))
                          }); setShowDeleteDialog(true)}}>
                          {m["common.delete"]()}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{m["common.areYouSure?"]()}</AlertDialogTitle>
            <AlertDialogDescription>
              {m["app.areYouSureWantToDeleteExpense"]()
                + ":"}
              <p className="text-lg font-bold text-black">{selectedExpense.name}</p>
              <p className="text-sm text-black">{selectedExpense.amount}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">{m["common.cancel"]()}</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer"
              onClick={() => {deleteExpense.mutate(selectedExpense.id)}}>
              {m["common.confirm"]()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
