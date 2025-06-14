import Cookies from "js-cookie";
import { create } from "zustand";

export const useAppDateStore = create((set) => ({
  selectedMonthYear: (() => {
    const storedMMYYYY = localStorage.getItem("selectedMonthYear");
    return storedMMYYYY ? new Date(storedMMYYYY) : new Date()
  })(),
  setSelectedMonthYear: (date) => {
    localStorage.setItem("selectedMonthYear", date.toISOString())
    set({ selectedMonthYear: date })
  }
}))

export const useAppJournalStore = create((set) => ({
  accordionState: (() => {
    return Cookies.get("accState")
  })(),
  setAccordionState: (value) => {
    Cookies.set("accState", value)
    set({ accordionState: value });
  }
}))

export const useAppJournalCategoryStore = create((set) => ({
  accordionState: (() => {
    return Cookies.get("accCategoryState")
  })(),
  setAccordionState: (value) => {
    Cookies.set("accCategoryState", value)
    set({ accordionState: value });
  }
}))