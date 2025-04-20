import {
  CommonResT,
  DeleteMessageResT,
  GetAllMessagesResT,
  GetAllSessionsResT,
  GetAllSystemPromptsResT,
} from "../types";
import { endpoints } from "../endpoints";
import axiosClient from "../axiosConfig";
import {
  CreateSystemPromptReqT,
  UpdateSystemPromptReqT,
} from "../types/requestsT/adminReuqests";

const {
  getMessages,
  deleteMessage,
  getSessions,
  deleteSession,
  getAllSystemPrompts,
  postSystemPrompt,
  putSystemPrompt,
  deleteSystemPrompt,
} = endpoints.admin;

export const getAllMessagesService = async (
  sender?: "assistant" | "user",
): Promise<GetAllMessagesResT> => {
  const httpRequest = await axiosClient.get(getMessages(sender));
  return httpRequest.data;
};

export const deleteMessageService = async (
  id: string,
): Promise<DeleteMessageResT> => {
  const httpRequest = await axiosClient.delete(deleteMessage(id));
  return httpRequest.data;
};

export const getAllSessionsService = async (): Promise<GetAllSessionsResT> => {
  const httpRequest = await axiosClient.get(getSessions);
  return httpRequest.data;
};

export const deleteSessionService = async (id: string): Promise<CommonResT> => {
  const httpRequest = await axiosClient.delete(deleteSession(id));
  return httpRequest.data;
};

export const getAllSystemPromptsService =
  async (): Promise<GetAllSystemPromptsResT> => {
    const httpRequest = await axiosClient.get(getAllSystemPrompts);
    return httpRequest.data;
  };

export const createSystemPromptService = async (
  prompt: CreateSystemPromptReqT,
): Promise<CommonResT> => {
  const httpRequest = await axiosClient.post(postSystemPrompt, prompt);
  return httpRequest.data;
};

export const updateSystemPromptService = async (
  id: string,
  prompt: UpdateSystemPromptReqT,
): Promise<CommonResT> => {
  const httpRequest = await axiosClient.put(putSystemPrompt(id), prompt);
  return httpRequest.data;
};

export const deleteSystemPromptService = async (
  id: string,
): Promise<CommonResT> => {
  const httpRequest = await axiosClient.delete(deleteSystemPrompt(id));
  return httpRequest.data;
};
