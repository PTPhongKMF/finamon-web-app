import { useMutation, useQuery } from "@tanstack/react-query"
import { kyAspDotnet } from "../../../api/ky"
import { useUserStore } from "../../../stores/userStore"
import { useEffect, useState } from "react";
import { EllipsisVertical, Layers, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../shadcn/dropdown-menu";
import { m } from "../../../i18n/paraglide/messages";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../shadcn/alert-dialog";

export default function CategoryList() {
  const [forcedLoading, setForcedLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const user = useUserStore(state => state.user);

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

  const deleteCategory = useMutation({
    mutationFn: async (id) => {
      setShowDeleteDialog(false);
      setForcedLoading(true);
      return await kyAspDotnet.delete(`api/category/${id}`).json();
    },
    onSuccess: () => {
      fetchCategories.refetch();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    },
    onSettled: () => setForcedLoading(false)
  })

  useEffect(() => {
    console.log(fetchCategories?.data?.items);
  })

  if (fetchCategories.isPending || forcedLoading)
    return (
      <div className="flex justify-center items-center space-x-1 min-h-50">
        <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="size-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="size-4 bg-gray-400 rounded-full animate-bounce"></span>
      </div>
    )
  else if (fetchCategories.isError)
    return (
      <p className="text-red-500 font-semibold">{fetchCategories.error.message}</p>
    )
  else
    return (
      <>
        <div className="flex gap-2 items-center mb-6">
          <Layers />
          {deleteCategory.isError && (
            <p className="text-red-500 font-semibold max-w-45 break-words">{deleteCategory.error.message}</p>
          )}
          {showSuccess && (
            <div className="transition-opacity duration-300 opacity-100 text-green-500 flex gap-2 items-center">
              <CheckCircle2 className="w-6 h-6" />
              <p className="font-semibold">{m["common.success"]()}</p>
            </div>)}
        </div>

        <section className="flex flex-col divide-y divide-gray-200">
          {fetchCategories.data.items.map(category => (
            <div key={category.id} className="flex justify-between py-4 items-center">

              <div className="flex gap-2 items-center">
                <div className="size-4 rounded-full" style={{ backgroundColor: category.color }} />
                <p className="font-semibold">{category.name}</p>
              </div>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="rounded-full p-0.5 hover:bg-gray-300 cursor-pointer"
                  >
                    <EllipsisVertical />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-20">
                  <DropdownMenuItem>
                    {m["common.edit"]()}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500"
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDeleteDialog(true)
                    }}>
                    {m["common.delete"]()}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>


            </div>
          ))}
        </section>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{m["common.areYouSure?"]()}</AlertDialogTitle>
              <AlertDialogDescription>
                {m["app.areYouSureWantToDeleteCategory"]()
                  + ": "}
                <span className="text-lg font-bold text-black">{selectedCategory.name}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">{m["common.cancel"]()}</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 hover:bg-red-600 cursor-pointer"
                onClick={() => deleteCategory.mutate(selectedCategory.id)}>
                {m["common.confirm"]()}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
}
