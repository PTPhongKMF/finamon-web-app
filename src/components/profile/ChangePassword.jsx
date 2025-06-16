import React, { useState } from "react"
import { m } from "../../i18n/paraglide/messages"
import { Check, CircleAlert, RotateCcwKey, UserCheck } from "lucide-react"
import { Input } from "../shadcn/input"
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { kyAspDotnet } from "../../api/ky";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { useProfileDialogStateStore } from "../../stores/profileStore";

export default function ChangePassword() {
  const [passForm, setPassForm] = useState({});
  const navigate = useNavigate();

  const setLogoutDialog = useProfileDialogStateStore(state => state.setLogoutDialog)

  const changePassword = useMutation({
    mutationFn: async () => {
      if (passForm.newPassword?.length < 6) throw new Error(m["auth.pass6MinChar"]());
      if (passForm.newPassword !== passForm.repeatNewPassword) throw new Error(m["auth.passNotMatch"]());

      return await kyAspDotnet.post("api/auth/change-password", {
        json: {
          currentPassword: passForm.password,
          newPassword: passForm.newPassword,
          confirmPassword: passForm.repeatNewPassword
        },
        hooks: {
          beforeError: [
            async error => {
              const errorResponse = await error.response.json();
              error.message = errorResponse.message;
              return error;
            }
          ]
        }
      })
    },
    onSuccess: () => {
      setLogoutDialog(true)
      navigate("/logout")
    }
  })

  return (
    <section>

      <label className="text-lg flex gap-2 items-center font-bold">
        <RotateCcwKey />
        {m["profile.changePassword"]()}
      </label>

      <div className="grid grid-cols-[auto_auto] grid-rows-3 gap-x-8 gap-y-4 w-fit h-fit items-center ps-4 text-sm my-6">

        <label htmlFor="oldPassword">{m["profile.oldPassword"]()}</label>
        <Input type="password" id="oldPassword" placeholder={m["profile.oldPassword"]()}
          value={passForm.name} onChange={(e) => setPassForm({ ...passForm, password: e.target.value })} />

        <label htmlFor="newPassword">{m["profile.newPassword"]()}</label>
        <Input type="password" id="newPassword" placeholder={m["profile.newPassword"]()}
          value={passForm.name} onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })} />

        <label htmlFor="repeatNewPassword">{m["profile.repeatNewPassword"]()}</label>
        <Input type="password" id="repeatNewPassword" placeholder={m["profile.repeatNewPassword"]()}
          value={passForm.name} onChange={(e) => setPassForm({ ...passForm, repeatNewPassword: e.target.value })} />

      </div>

      <div className="flex gap-6 ps-3 items-center">
        <button onClick={changePassword.mutate}
          disabled={!passForm.password || !passForm.newPassword || !passForm.repeatNewPassword || changePassword.isPending}
          className={clsx("flex gap-2 items-center bg-green-500 hover:bg-green-600 cursor-pointer text-sm text-white font-semibold py-2 px-4 min-w-25 h-fit rounded",
            "disabled:bg-gray-500 disabled:cursor-not-allowed"
          )}
        >
          <Check />
          {m["common.confirm"]()}
        </button>

        {changePassword.isError && (
          <p className="text-red-500 flex gap-2">
            <CircleAlert />
            {changePassword.error.message}
          </p>
        )}
      </div>

    </section>
  )
}
