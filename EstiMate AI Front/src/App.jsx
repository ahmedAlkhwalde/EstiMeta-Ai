import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatEstimator from "./pages/components/ChatEstimator.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChatEstimator />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
