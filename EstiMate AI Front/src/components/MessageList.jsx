import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Person, SmartToy } from "@mui/icons-material";

const MotionDiv = motion.div;

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <MotionDiv
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      dir="ltr"
    >
      <div
        className={`flex max-w-[85%] items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-sm ${isUser ? "bg-emerald-600" : "bg-slate-900"}`}
          aria-hidden
        >
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </div>
        <div
          className={`rounded-3xl px-4 py-3 text-sm leading-7 shadow-sm ${isUser ? "border border-emerald-100 bg-emerald-50 text-slate-900" : "bg-slate-900 text-white"}`}
          dir="rtl"
        >
          <p className="whitespace-pre-line text-right">{message.text}</p>
        </div>
      </div>
    </MotionDiv>
  );
};

const MessageList = ({ onAutoRef, isSending }) => {
  const messages = useSelector((s) => s.chat.messages);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={listRef} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
      <AnimatePresence initial={false} mode="popLayout">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </AnimatePresence>
      {isSending ? (
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="animate-pulse">قيد المعالجة ...</span>
        </div>
      ) : null}
      <div ref={onAutoRef} />
    </div>
  );
};

export default MessageList;
