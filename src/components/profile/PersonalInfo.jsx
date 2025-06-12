import React, { lazy, Suspense, useEffect, useState } from "react"
import { m } from "../../i18n/paraglide/messages"
import { Input } from "../shadcn/input"
import { useUserStore } from "../../stores/userStore";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import { Info, UserCheck, UserPen, UserX } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { kyAspDotnet } from "../../api/ky";

const CountryDropdown = lazy(() =>
  import("react-country-region-selector").then(module => ({ default: module.CountryDropdown }))
);

export default function PersonalInfo() {
  const [viewState, setViewState] = useState(true);
  const [viewData, setViewData] = useState({});
  const [showRes, setShowRes] = useState(false);

  const { user, setUser } = useUserStore(useShallow(
    state => ({
      user: state.user,
      setUser: state.setUser,
    })
  ))

  const updateUserInfo = useMutation({
    mutationFn: async () => {
      return await kyAspDotnet.put(`api/user/${user.id}`, {
        json: {
          ...(viewData.name && { userName: viewData.name }),
          ...(viewData.phone && { phone: viewData.phone }),
          ...(viewData.country && { country: viewData.country })
        }
      }).json();
    },
    onSuccess: (data) => {
      setUser({
        name: data.userName,
        phone: data.phone,
        country: data.country
      })
      setViewState(true);
    },
    onSettled: () => setShowRes(true)
  })

  useEffect(() => {
    setViewData({
      name: user.name,
      phone: user.phone,
      country: user.country
    })
  }, [viewState, user.country, user.name, user.phone])

  useEffect(() => {
    setShowRes(false);
  }, [viewState])

  return (
    <section className="flex flex-col gap-8 justify-between">

      <div className="grid grid-cols-[auto_auto] grid-rows-3 gap-6 w-fit h-fit items-center">
        <label htmlFor="name">
          {m["common.name"]() + ":"}
        </label>
        <input type="text" id="name" disabled={viewState} placeholder={m["common.empty"]()}
          value={viewState ? user.name : viewData.name} onChange={(e) => setViewData({ ...viewData, name: e.target.value })}
          className={clsx("h-9 w-full px-3 py-1 items-center",
            viewState ? "text-sm" : "rounded-md border",
            !viewData.name && "text-gray-500 italic"
          )} />

        <label>
          {m["common.phone"]() + ":"}
        </label>
        <input type="tel" id="phone" disabled={viewState} placeholder={m["common.empty"]()}
          value={viewState ? user.phone : viewData.phone} onChange={(e) => setViewData({ ...viewData, phone: e.target.value })}
          className={clsx("h-9 w-full px-3 py-1",
            viewState ? "text-sm" : "rounded-md border",
            !viewData.phone && "text-gray-500 italic"
          )} />

        <label>
          {m["common.country"]() + ":"}
        </label>
        {viewState ? 
        <p className="px-3 py-1 text-sm">
          {user.country}
        </p>
        : 
        <Suspense fallback={<p>...</p>}>
          <CountryDropdown disabled={viewState} defaultOptionLabel={m["common.empty"]()}
            value={viewState ? user.country : viewData.country} onChange={(val) => setViewData({ ...viewData, country: val })}
            className={clsx("h-9 w-full px-3 py-1",
              viewState ? "text-sm" : "rounded-md border",
              (viewState && !viewData.country) && "text-gray-500 italic opacity-50"
            )}
          />
        </Suspense>
        }
      </div>

      <div className="flex">
        {viewState && (
          <button onClick={() => setViewState(false)} title="hidhsids \n jdjsods"
            className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600 cursor-pointer text-sm text-white font-semibold py-2 px-4 min-w-25 h-fit rounded"
          >
            <UserPen />
            {m["common.edit"]()}
          </button>
        )}

        {!viewState && (
          <div className="flex gap-2 items-center">
            <button onClick={() => setViewState(true)}
              disabled={updateUserInfo.isPending}
              className={clsx("flex gap-2 items-center bg-red-500 hover:bg-red-600 cursor-pointer text-sm text-white font-semibold py-2 px-4 min-w-25 h-fit rounded",
                "disabled:bg-gray-500 disabled:cursor-not-allowed"
              )}
            >
              <UserX />
              {m["common.cancel"]()}
            </button>
            <button onClick={updateUserInfo.mutate}
              disabled={!viewData.name || !viewData.phone || !viewData.country || updateUserInfo.isPending}
              className={clsx("flex gap-2 items-center bg-green-500 hover:bg-green-600 cursor-pointer text-sm text-white font-semibold py-2 px-4 min-w-25 h-fit rounded",
                "disabled:bg-gray-500 disabled:cursor-not-allowed"
              )}
            >
              <UserCheck />
              {m["common.confirm"]()}
            </button>

            {(!viewData.name || !viewData.phone || !viewData.country) && (
              <div className="ms-2 flex gap-2 text-sm items-center text-blue-700">
                <Info className="size-[1em]" />
                <p>{m["common.fillAllFieldText"]()}</p>
              </div>
            )}
          </div>
        )}

      </div>

      <p className={clsx("text-sm font-semibold",
        updateUserInfo.isSuccess && "text-green-500",
        updateUserInfo.isError && "text-red-500"
      )}>
        {showRes && updateUserInfo.isSuccess ? m["common.success"]() :
          showRes && updateUserInfo.isError ? <> {m["common.error"]()} <br /> {updateUserInfo.error.message} </> :
            ""
        }
      </p>

    </section>
  )
}
