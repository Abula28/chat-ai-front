import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import MainComponent from "./components/main-component/MainComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <ToastContainer
            limit={3}
            hideProgressBar={true}
            position="top-right"
            closeOnClick
          />
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/:sessionId" element={<MainComponent />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
