export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    checkIn: "/auth/check-in",
  },
  admin: {
    // ========================== Messages ========================== //
    getMessages: (sender?: "assistant" | "user") => {
      if (!sender) return "/admin/messages";
      return `/admin/messages?sender=${sender}`;
    },
    deleteMessage: (id: string) => `/admin/message/${id}`,

    // ========================== Prompts ========================== //
    getAllSystemPrompts: "/admin/prompts",
    postSystemPrompt: "/admin/prompt",
    putSystemPrompt: (id: string) => `/admin/prompt/${id}`,
    deleteSystemPrompt: (id: string) => `/admin/prompt/${id}`,

    // ========================== Sessions ========================== //
    getSessions: "/admin/sessions",
    deleteSession: (id: string) => `/admin/session/${id}`,

    // ========================== System Prompt ========================== //
    createPrompt: "/admin/prompt",
    putPrompt: (id: string) => `/admin/prompt/${id}`,
  },
  getKnowledge: "/knowledge",
  chat: {
    postSession: "/chat/session",
    getSessionMessages: (id: string) => `/chat/session/${id}/messages`,
    sendMessage: "/chat",
    sessions: "/chat/sessions",
  },
};
