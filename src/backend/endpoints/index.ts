export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    checkIn: "/auth/check-in",
  },
  admin: {
    getPrompt: "/admin/prompt",
    getSessions: "/admin/sessions",
    getSessionDetail: (id: string) => `/admin/sessions/${id}`,
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
