import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import AdminLayout from "./components/admin/AdminLayout";
import SystemPrompts from "./components/admin/SystemPrompts";
import ChatSessions from "./components/admin/ChatSessions";
import Messages from "./components/admin/Messages";
import Layout from "./components/layout/Layout";
import MainComponent from "./components/main-component/MainComponent";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./lib";
import ResetPassword from "./components/auth-components/reset-password/ResetPassword";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="system-prompts" element={<SystemPrompts />} />
            <Route path="sessions" element={<ChatSessions />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          {/* Main App Routes */}
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<MainComponent />} />
            <Route path="/:sessionId" element={<MainComponent />} />
          </Route>

          {/* Reset Password Route */}

          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>

        <ToastContainer
          limit={3}
          hideProgressBar={true}
          position="top-right"
          closeOnClick
        />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
