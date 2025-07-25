import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../shadcn/table";
import { format, monthEnd, monthStart } from "@formkit/tempo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/dropdown-menu";
import { CheckCircle2, MoreHorizontal, SquarePen } from "lucide-react";
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
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../shadcn/dialog";
import { Input } from "../../shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcn/select"
import { Textarea } from "../../shadcn/textarea";
import { Button } from "../../shadcn/button";

export default function JournalTable() {
  const [forcedLoading, setForcedLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({})

  const user = useUserStore(state => state.user);
  const selectedMonthYear = useAppDateStore(state => state.selectedMonthYear);

  const { PageNumber, PageSize, SortBy, SortDescending
    // , setPageNumber, setPageSize, setSortBy, setSortDescending 
  } = useAppTableStore(useShallow((state) => ({
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

  const fetchCategories = useQuery({
    queryKey: ["all_category", user.id],
    queryFn: async () => {
      return await kyAspDotnet.get(`api/category/user/${user.id}`, {
        searchParams: {
          pageNumber: 1,
          pageSize: 1000
        }
      }).json();
    },
  })

  const deleteExpense = useMutation({
    mutationFn: async (id) => {
      setShowDeleteDialog(false);
      setForcedLoading(true);
      return await kyAspDotnet.delete(`api/expense/${id}`).json()
    },
    onSuccess: () => {
      fetchExpenses.refetch();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    },
    onSettled: () => setForcedLoading(false)
  })

  const editExpense = useMutation({
    mutationFn: async (id) => {
      setShowEditDialog(false);
      setForcedLoading(true);
      return await kyAspDotnet.put(`api/expense/${id}`, {
        json: {
          name: selectedExpense.name,
          description: selectedExpense.description,
          amount: selectedExpense.amount,
          categoryId: selectedExpense.categoryId
        }
      }).json()
    },
    onSuccess: () => {
      fetchExpenses.refetch();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    },
    onSettled: () => setForcedLoading(false)
  })

  if (fetchExpenses.isPending || forcedLoading)
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
      {editExpense.isError && (
        <p className="text-red-500 font-semibold mb-4">
          {editExpense.error.message}
        </p>
      )}

      {showSuccess && (
            <div className="mb-2 transition-opacity duration-300 opacity-100 text-green-500 flex gap-2 items-center">
              <CheckCircle2 className="w-6 h-6" />
              <p className="font-semibold">{m["common.success"]()}</p>
            </div>)}

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
                          onClick={() => {
                            setSelectedExpense(expense);
                            setShowEditDialog(true);
                          }}
                        >
                          {m["common.edit"]()}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setSelectedExpense({
                              id: expense.id,
                              name: expense.name,
                              amount: formatVND(parseInt(expense.amount))
                            });
                            setShowDeleteDialog(true)
                          }}>
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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              <SquarePen />
              <p>{m["app.editExpense"]()}</p>
            </DialogTitle>
          </DialogHeader>
          <section className="grid grid-cols-[auto_auto] w-fit grid-rows-2 gap-4 px-4 mt-4 items-center">
            <label htmlFor="expName">{m["common.name"]()}</label>
            <Input type="text" id="expName" placeholder={m["common.name"]()}
              value={selectedExpense.name} onChange={(e) => setSelectedExpense({ ...selectedExpense, name: e.target.value })} />

            <label htmlFor="expAmount">{m["common.amount"]()}</label>
            <Input type="number" step="0.01" min="0" id="expAmount" placeholder={m["common.amount"]()}
              value={selectedExpense.amount} onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })} />

            <label>{m["app.category"]()}</label>
            {fetchCategories.isPending ? (
              <div className="flex justify-center items-center gap-1 h-full">
                <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            ) : fetchCategories.isSuccess && (
              <Select
                value={selectedExpense.categoryId}
                onValueChange={(value) => setSelectedExpense({ ...selectedExpense, categoryId: value })}>
                <SelectTrigger className="shadow-xs cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-40 w-fit overflow-y-auto scroll-smooth">
                  {fetchCategories.data.items.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="cursor-pointer"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <label htmlFor="expDesc">{m["common.note"]()}</label>
            <Textarea id="expDesc" placeholder={m["common.enterNoteHere"]()}
              value={selectedExpense.description} onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })} />
          </section>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">{m["common.cancel"]()}</Button>
            </DialogClose>
            <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
              onClick={() => editExpense.mutate(selectedExpense.id)}>
              {m["common.confirm"]()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              onClick={() => { deleteExpense.mutate(selectedExpense.id) }}>
              {m["common.confirm"]()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
