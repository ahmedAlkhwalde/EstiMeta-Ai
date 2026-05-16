import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: "welcome",
      role: "bot",
      text: "مرحبا! أنا مساعد تقدير التكلفة. اكتب وصفا واضحا لمشروعك لنبدأ الحساب.",
    },
  ],
  estimation: {
    fp_count: 0,
    ucp_count: 0,
    effort: 0,
    cost: 0,
  },
  reportUrl: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setEstimation(state, action) {
      state.estimation = action.payload;
    },
    setReportUrl(state, action) {
      state.reportUrl = action.payload;
    },
    clearChat(state) {
      state.messages = initialState.messages;
      state.estimation = initialState.estimation;
      state.reportUrl = "";
    },
  },
});

export const {
  addMessage,
  setMessages,
  setEstimation,
  setReportUrl,
  clearChat,
} = chatSlice.actions;
export default chatSlice.reducer;
