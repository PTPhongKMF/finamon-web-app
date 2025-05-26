import { create } from "zustand";
import Cookies from "js-cookie";

export const useUserStore = create((set, get) => ({
  user: (() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })(),

  setUser: (user) => {
    set({ user });

    if (user) {
      const token = Cookies.get("token");
      if (token) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        get().clearUser();
      }
    }
  },

  clearUser: () => {
    set({ user: null }); 
    localStorage.removeItem('user');
    Cookies.remove('token');
  }
}))