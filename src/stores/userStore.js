import { create } from "zustand";
import Cookies from "js-cookie";

export const useUserStore = create((set, get) => ({
  user: (() => {
    if (!Cookies.get("token")) return null;

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })(),

  setUser: (updatedUser) => {
    const token = Cookies.get("token");

    if (updatedUser && token) {
      set({
        user: {
          ...get().user, ...updatedUser
        }
      })

      localStorage.setItem("user", JSON.stringify(get().user));
    } else {
      set({ user: updatedUser })
      get().clearUser();
    }
  },

  clearUser: () => {
    set({ user: null });
    localStorage.removeItem('user');
    Cookies.remove('token');
  }
}))