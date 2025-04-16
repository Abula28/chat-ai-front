import axiosClient from "../axiosConfig";
import { endpoints } from "../endpoints";
import {
  GetSessionMessagesResT,
  GetUserSessionsResT,
  PostSessionResT,
} from "../types";
import { PostMessageReqT } from "../types/requestsT/chatRequests";

const { chat } = endpoints;

export const postSession = async (): Promise<PostSessionResT> => {
  const httpRequest = await axiosClient.post(chat.postSession);
  return httpRequest.data;
};

export const getUserSessions = async (): Promise<GetUserSessionsResT> => {
  const httpRequest = await axiosClient.get(chat.sessions);
  return httpRequest.data;
};

export const getSessionMessages = async (
  sessionId: string,
): Promise<GetSessionMessagesResT[]> => {
  const httpRequest = await axiosClient.get(chat.getSessionMessages(sessionId));
  return httpRequest.data;
};

export const postMessage = async (data: PostMessageReqT) => {
  const httpRequest = await axiosClient.post(chat.sendMessage, data);
  return httpRequest.data;
};
