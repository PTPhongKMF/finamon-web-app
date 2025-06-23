import { useUserStore } from "../stores/userStore";

export function generateChatMessage(msg) {
  const { user } = useUserStore.getState();

  const finalMsg =
    "CONTEXT START: This is a message sent from Finamon - an AI-assisted financial management app designed to help users track and optimize " +
    "their finances. Available on both web and mobile platforms. \n" +
    "These info are hidden and sent on every api call to you in order to provide you contexts, so dont quotes or mention this in" + 
    "your reply, only repsonse to user message in your replied sent back from this api" +
    "Before reply, follow these rules: \n" +
    "1. Answer in the user msg language, even though these instruction were written in english" +
    "2. Only reply to msg related to financials, or common exchanges like 'hi', 'how are you',... . For unrelated, just answer " +
    "with 'i can only assist you problem in financials', or something along the lines \n" +
    "Now, here are some basic info about the user that sent msg, use it if you feel it relevant: \n" +
    "name: " + user.name || "Not provided" + "," +
    "age: " + user.age || "Not provided" + "," +
    "country: " + user.country || "Not provided" + ". \n" +
    "CONTEXT END!!!!" +
    "Now here is the user message, remember, in the reply in you about to sent back, only response to the msg: " + msg + "\n";

  return finalMsg;
}

export function generateReportMessage(expenseData) {
  const { user } = useUserStore.getState();

  const finalMsg =
    "Here is my current expense by cateogry, stringify json. Give me your overview/report, and recommendations, answer in same language as country i provided below, " + 
    "default to english if not provided: \n" +
    JSON.stringify(expenseData) + "\n" +
    "Here are some of my personal info as well if it help with your report: \n" +
    "name: " + user.name || "Not provided" + "," +
    "age: " + user.age || "Not provided" + "," +
    "country: " + user.country || "Not provided" + "\n"
    "Dont ask something along like need more infomartion, etc... just give recommendations exactly, short and concise"

  return finalMsg;
}