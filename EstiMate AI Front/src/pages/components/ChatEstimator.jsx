import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";
import {
  addMessage,
  setEstimation,
  setReportUrl,
} from "../../features/chat/chatSlice";
import { toggleTheme } from "../../features/ui/uiSlice";
import { useSendMessage } from "../../hooks/useChat";

const normalizeChatText = (value) => (typeof value === "string" ? value : "");

const ChatEstimator = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const sendMutation = useSendMessage({
    onSuccess: (data) => {
      const replyText =
        data?.reply ?? data?.message ?? data?.response ?? data?.answer ?? "لا يوجد رد";
      dispatch(
        addMessage({
          id: `bot-${Date.now()}`,
          role: "bot",
          text: replyText,
        }),
      );

      const estimationData = data?.current_estimation ?? data?.results ?? null;
      if (estimationData) {
        dispatch(
          setEstimation({
            fp_count:
              Number(estimationData.fp_count ?? estimationData.final_fp) || 0,
            ucp_count:
              Number(estimationData.ucp_count ?? estimationData.final_ucp) || 0,
            effort:
              Number(
                estimationData.effort ?? estimationData.estimated_effort,
              ) || 0,
            cost:
              Number(estimationData.cost ?? estimationData.estimated_cost) || 0,
          }),
        );
      }

      if (data?.status === "completed" && data?.report_url) {
        dispatch(setReportUrl(data.report_url));
      }
    },
    onError: (error) => {
      const serverMessage =
        error?.response?.data?.detail ??
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        error?.message ??
        "حدث خطأ أثناء معالجة الطلب";

      dispatch(
        addMessage({
          id: `bot-error-${Date.now()}`,
          role: "bot",
          text: normalizeChatText(serverMessage),
        }),
      );
    },
  });

  const handleSent = (payload) => {
    const nextUserMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: payload,
    };

    dispatch(addMessage(nextUserMessage));

    const historyPayload = messages
      .filter((message) => message.id !== "welcome")
      .map((message) => ({
        role: message.role === "bot" ? "assistant" : "user",
        content: message.text,
        message: message.text,
      }))
      .concat({
        role: "user",
        content: payload,
        message: payload,
      });

    sendMutation.mutate({
      message: payload,
      history: historyPayload,
      session_id: "user_session_123",
    });
  };

  const handleDownload = (url) => {
    if (!url) {
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100"
    >
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row">
        <div className="order-2 md:order-1 md:w-80">
          <Sidebar
            onDownload={handleDownload}
            onToggleTheme={handleToggleTheme}
          />
        </div>

        <motion.main
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-1 flex min-h-[calc(100vh-4rem)] flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-slate-950/40 md:sticky md:top-6 md:h-[calc(100vh-48px)] md:order-2"
        >
          <header className="flex items-center justify-between border-b border-slate-200/70 px-6 py-5 dark:border-slate-800">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-400">
                مساعد التقدير الذكي
              </p>
              <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                محادثة تقدير تكاليف البرمجيات
              </h1>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              متصل الآن
            </div>
          </header>

          <MessageList isSending={sendMutation.isPending} />
          <MessageInput
            onSend={handleSent}
            isSending={sendMutation.isPending}
          />
        </motion.main>
      </div>
    </div>
  );
};

export default ChatEstimator;
