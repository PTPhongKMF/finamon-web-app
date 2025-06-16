import React from "react"
import { useProfileDialogStateStore } from "../../stores/profileStore"
import { useShallow } from "zustand/react/shallow"
import { Dialog, DialogContent } from "../shadcn/dialog"
import { m } from "../../i18n/paraglide/messages"

export default function SuccessLogoutDialog() {
  const { logoutDialog, setLogoutDialog } = useProfileDialogStateStore(useShallow(
    state => ({
      logoutDialog: state.logoutDialog,
      setLogoutDialog: state.setLogoutDialog
    })
  ))

  return (
    <Dialog open={logoutDialog} onOpenChange={setLogoutDialog}>
      <DialogContent>
        <p className="text-2xl text-green-500 font-semibold">
          {m["common.success"]()}
          </p>
        <p>{m["profile.successPasswordChangeText"]()}</p>
      </DialogContent>
    </Dialog>
  )
}
