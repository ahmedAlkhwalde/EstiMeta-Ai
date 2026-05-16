import React, { useState } from "react";
import { Send } from "@mui/icons-material";
import { motion } from "motion/react";

const MotionDiv = motion.div;

const MessageInput = ({ onSend, isSending }) => {
  const [value, setValue] = useState("");

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;

    setValue("");
    if (onSend) {
      onSend(trimmed);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <MotionDiv
      layout
      className="sticky bottom-0 border-t border-slate-200/70 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="flex items-end gap-3">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب تفاصيل مشروعك هنا..."
          className="min-h-13 flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || isSending}
          className="flex h-13 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-px hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="إرسال الرسالة"
        >
          <Send fontSize="small" />
        </button>
      </div>
    </MotionDiv>
  );
};

export default MessageInput;
