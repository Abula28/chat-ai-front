import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSessionMessages,
  getUserSessions,
  postMessage,
  postSession,
} from "../services";
import { PostMessageReqT, PostSessionReqT } from "../types/requestsT";
export const useCreateSession = () => {
  return useMutation({
    mutationFn: (data: PostSessionReqT) => postSession(data),
    mutationKey: ["useCreateSession"],
  });
};

export const useGetUserSessions = () => {
  return useQuery({
    queryKey: ["useGetUserSessions"],
    queryFn: getUserSessions,
    retry: false,
  });
};

export const useGetSessionMessages = () => {
  return useMutation({
    mutationFn: (sessionId: string) => getSessionMessages(sessionId),
    mutationKey: ["useGetSessionMessages"],
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: PostMessageReqT) => postMessage(data),
    mutationKey: ["useSendMessage"],
  });
};
