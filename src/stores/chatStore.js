import { create } from "zustand";

export const useChatMessageStore = create((set, get) => ({
  chatHistory: (() => {
    const storedHistory = sessionStorage.getItem("chatHistory");
    return storedHistory ? JSON.parse(storedHistory) : { stored: [] };
  })(),
  setChatHistory: (newChatArray) => {
    if (newChatArray) {
      set({
        chatHistory: {
          stored: [...get().chatHistory.stored, ...newChatArray]
        }
      })
      sessionStorage.setItem("chatHistory", JSON.stringify(get().chatHistory))
    } else {
      sessionStorage.removeItem("chatHistory");
      set({ chatHistory: { stored: [] } })
    }
  }
}))