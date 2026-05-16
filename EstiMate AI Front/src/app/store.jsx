import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    ui: uiReducer,
  },
});

export default store;
