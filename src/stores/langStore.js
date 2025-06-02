import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  lang: localStorage.getItem("lang") || "en",
  setLang: (lang) => {
    set({ lang });
    localStorage.setItem("lang", lang);
  }
}));