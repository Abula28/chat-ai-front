import axiosClient from "../axiosConfig";
import { endpoints } from "../endpoints";
import {
  GetSessionMessagesResT,
  GetUserSessionsResT,
  PostSessionResT,
} from "../types";
import {
  PostMessageReqT,
  PostSessionReqT,
} from "../types/requestsT/chatRequests";

const { chat } = endpoints;

export const postSession = async (
  data: PostSessionReqT,
): Promise<PostSessionResT> => {
  const httpRequest = await axiosClient.post(chat.postSession, data);
  return httpRequest.data;
};

export const getUserSessions = async (): Promise<GetUserSessionsResT[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

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
