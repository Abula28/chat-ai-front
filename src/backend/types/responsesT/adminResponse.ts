import { CommonResT } from "./commonT";

export interface MessagesResT {
  _id: string;
  sender: string;
  content: string;
  systemId: string;
  sessionId: string;
  username: string;
  createdAt: string;
}

export interface SessionsResT {
  _id: string;
  userId: string;
  username: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemPromptResT {
  _id: string;
  content: string;
  category: string;
  role: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllMessagesResT extends CommonResT {
  messages: MessagesResT[];
}

export interface DeleteMessageResT extends CommonResT {}

export interface GetAllSessionsResT extends CommonResT {
  sessions: SessionsResT[];
}

export interface GetAllSystemPromptsResT extends CommonResT {
  prompts: SystemPromptResT[];
}
