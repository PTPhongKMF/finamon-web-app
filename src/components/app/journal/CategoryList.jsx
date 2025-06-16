import { useQuery } from "@tanstack/react-query"
import { kyAspDotnet } from "../../../api/ky"
import { useUserStore } from "../../../stores/userStore"
import { useEffect } from "react";
import { Layers } from "lucide-react";

export default function CategoryList() {
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

  useEffect(() => {
    console.log(fetchCategories?.data?.items);
  })

  if (fetchCategories.isPending)
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
        <Layers className="mb-6" />
        <section className="flex flex-col divide-y divide-gray-200">
          {fetchCategories.data.items.map(category => (
            <div id={category.id} className="flex justify-between gap-2 py-4 items-center">

              <p className="font-semibold">{category.name}</p>
              <div className="size-4 rounded-full" style={{ backgroundColor: category.color }} />

            </div>
          ))}
        </section>
      </>
    )
}
