import { create } from "zustand";

export const useProfileDialogStateStore = create((set) => ({
  logoutDialog: false,
  setLogoutDialog: (state) => {
    set({ logoutDialog: state })
  }
}))