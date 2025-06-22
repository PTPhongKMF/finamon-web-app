import React, { useState, useEffect, useRef } from "react"
import { useUserStore } from "../stores/userStore"
import Cookies from "js-cookie";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { m } from "../i18n/paraglide/messages";
import { SendHorizonal, SquareMinus } from "lucide-react";
import { ScrollArea } from "./shadcn/scroll-area";
import { Textarea } from "./shadcn/textarea";
import { useMutation } from "@tanstack/react-query";
import { kyDjango } from "../api/ky";
import { useChatMessageStore } from "../stores/chatStore";
import { useShallow } from "zustand/shallow";
import ReactMarkdown from "react-markdown";
import { generateChatMessage } from "../utils/aiChat";

export default function FloatAIChat() {
  const [animate, setAnimate] = useState(() => {
    const storedAnimate = sessionStorage.getItem("aiChatAnimate");
    return storedAnimate === null ? true : JSON.parse(storedAnimate);
  });
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState("")
  const [tempMsg, setTempMsg] = useState();
  const viewportRef = useRef(null);

  const user = useUserStore(state => state.user);

  const { chatHistory, setChatHistory } = useChatMessageStore(useShallow(
    state => ({
      chatHistory: state.chatHistory,
      setChatHistory: state.setChatHistory
    })
  ));

  const sendMsg = useMutation({
    mutationFn: async () => {
      const messageToSend = userMsg;
      setTempMsg({ message: messageToSend, sentAt: new Date() });
      setUserMsg("");

      return await kyDjango.post("api/chat/", {
        json: {
          message: messageToSend //generateChatMessage(messageToSend)
        }
      }).json()
    },
    onSuccess: (data) => {
      setChatHistory([
        { isBot: false, message: tempMsg.message, sentAt: tempMsg.sentAt },
        { isBot: true, message: data.reply, sentAt: new Date() }
      ]);
    }
  })

  useEffect(() => {
    if (viewportRef.current) {
      const scrollArea = viewportRef.current;
      scrollArea.scroll({ top: scrollArea.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory, tempMsg]);

  useEffect(() => {
    sessionStorage.setItem("aiChatAnimate", JSON.stringify(animate));
  }, [animate]);

  if (!user && !Cookies.get("token")) return null;

  return createPortal(
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => { setAnimate(false); setIsOpen(!isOpen); }}
          className="flex flex-col justify-center items-center fixed bottom-2 right-6 cursor-pointer"
        >
          <div className="relative">
            {animate && (
              <>
                <div className="absolute inset-0 rounded-full border-3 border-green-700 animate-pulse-ring" />
                <div className="absolute inset-0 rounded-full border-3 border-green-700 animate-pulse-ring" style={{ animationDelay: "2.5s" }} />
              </>
            )}
            <div className={clsx(
              "relative size-fit rounded-full p-2 shadow-lg bg-white hover:bg-green-100 border-3 border-green-700",
              animate && "animate-double-spin"
            )}>
              <img src="logo/finamon.svg"
                className="size-8" />
            </div>
          </div>

          <p className="font-semibold text-sm mt-1">AI Chat</p>

        </button>
      </PopoverTrigger>
      <PopoverContent side="left" align="end"
        className="w-100 h-130 grid grid-rows-[auto_1fr_auto] p-0">

        <div className="flex justify-between items-center bg-yellow-500 rounded-t-md p-2">
          <div className="flex gap-2 justify-between items-center w-fit">
            <h3 className="text-xl font-semibold text-white">{m["app.AI.chatWithAI"]()}</h3>
            <div className="size-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>

          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/20 rounded-md">
            <SquareMinus className="text-white cursor-pointer" />
          </button>
        </div>

        <div className="flex-1 min-h-0">
          <ScrollArea viewportRef={viewportRef}
            className="h-full w-full px-2 pt-0 pb-3">
            <div className="h-full w-full grid auto-rows-auto gap-2">

              {chatHistory.stored ? (
                chatHistory.stored.map((msg, index) => {
                  if (msg.isBot) {
                    return (
                      <div key={index} className="flex justify-start items-start gap-1 pe-2">
                        <img src="logo/finamon.svg" alt="Bot Image" className="size-10 rounded-full object-cover border-2 border-gray-200" />
                        <div className="text-xs rounded-lg p-2 bg-gray-200 mt-1">
                          <ReactMarkdown>
                            {msg.message}
                          </ReactMarkdown>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex justify-end items-start gap-1 ps-2">
                        <p className="text-xs rounded-lg p-2 bg-gray-200 mt-1">
                          {msg.message}
                        </p>
                        <img src={user.image} alt="User Avatar" className="size-10 rounded-full object-cover border-2 border-gray-200" />
                      </div>
                    );
                  }
                })
              ) : (
                <p className="italic flex justify-center items-center text-gray-500">{m["common.empty"]()}</p>
              )}

              {(sendMsg.isPending || sendMsg.isError) && (
                <>
                  <div className="flex justify-end items-start gap-1 ps-2">
                    <p className={clsx("text-xs rounded-lg p-2 bg-gray-200 mt-1",
                      sendMsg.isError && "italic text-gray-400"
                    )}>
                      {tempMsg.message}
                    </p>
                    <img src={user.image} alt="User Avatar" className="size-10 rounded-full object-cover border-2 border-gray-200" />
                  </div>

                  <div className="flex justify-start items-start gap-1 pe-2">
                    <img src="logo/finamon.svg" alt="Bot Image" className="size-10 rounded-full object-cover border-2 border-gray-200" />
                    <p className={clsx("rounded-lg p-2 bg-gray-200 mt-1",
                      sendMsg.isError ? "text-red-500 text-sm font-semibold" : "text-xs"
                    )}>
                      {sendMsg.isPending ? (
                        <span className="flex justify-center items-center gap-3 h-4">
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce"></span>
                        </span>
                      ) : sendMsg.isError && (
                        sendMsg?.error?.message || m["common.error"]()
                      )}
                    </p>
                  </div>
                </>
              )}

            </div>
          </ScrollArea>
        </div>

        <div className="flex justify-between items-center min-h-8 p-2 gap-2 border-t-1 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Textarea
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     if (!e.shiftKey) {
            //       e.preventDefault();
            //       if (userMsg.trim()) {
            //         sendMsg.mutate();
            //       }
            //     }
            //   }
            // }}
            placeholder={m["app.AI.chatWithAI"]()}
            className="text-sm w-80 h-10 p-2" />

          <button disabled={!userMsg}
            className="p-2 cursor-pointer border-2 border-blue-400 rounded-md hover:bg-cyan-200 disabled:border-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            onClick={() => sendMsg.mutate()}>
            <SendHorizonal className={clsx(!userMsg ? "text-gray-400" : "text-blue-700")} />
          </button>
        </div>

      </PopoverContent>
    </Popover>,
    document.body
  )
}
