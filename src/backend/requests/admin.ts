import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSystemPromptService,
  deleteMessageService,
  deleteSessionService,
  deleteSystemPromptService,
  getAllMessagesService,
  getAllSessionsService,
  getAllSystemPromptsService,
  updateSystemPromptService,
} from "../services";
import {
  GetAllMessagesResT,
  GetAllSessionsResT,
  GetAllSystemPromptsResT,
} from "../types";
import { queryClient } from "../../lib";
import {
  CreateSystemPromptReqT,
  UpdateSystemPromptReqT,
} from "../types/requestsT/adminReuqests";

export const useGetAllMessagesReq = (sender?: "assistant" | "user") => {
  return useQuery<GetAllMessagesResT>({
    queryKey: ["useGetAllMessagesReq", sender],
    queryFn: () => getAllMessagesService(sender),
  });
};

export const useDeleteMessageReq = () => {
  return useMutation({
    mutationFn: (id: string) => deleteMessageService(id),
    mutationKey: ["useDeleteMessageReq"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAllMessagesReq"],
      });
    },
  });
};

export const useGetAllSessionsReq = () => {
  return useQuery<GetAllSessionsResT>({
    queryKey: ["useGetAllSessionsReq"],
    queryFn: () => getAllSessionsService(),
  });
};

export const useDeleteSessionReq = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSessionService(id),
    mutationKey: ["useDeleteSessionReq"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAllSessionsReq"],
      });
    },
  });
};

export const useGetAllSystemPromptsReq = () => {
  return useQuery<GetAllSystemPromptsResT>({
    queryKey: ["useGetAllSystemPromptsReq"],
    queryFn: () => getAllSystemPromptsService(),
  });
};

export const useCreateSystemPromptReq = () => {
  return useMutation({
    mutationFn: (prompt: CreateSystemPromptReqT) =>
      createSystemPromptService(prompt),
    mutationKey: ["useCreateSystemPromptReq"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAllSystemPromptsReq"],
      });
    },
  });
};

export const useUpdateSystemPromptReq = () => {
  return useMutation({
    mutationFn: (prompt: UpdateSystemPromptReqT) =>
      updateSystemPromptService(prompt.id, prompt),
    mutationKey: ["useUpdateSystemPromptReq"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAllSystemPromptsReq"],
      });
    },
  });
};

export const useDeleteSystemPromptReq = () => {
  return useMutation({
    mutationFn: (id: string) => deleteSystemPromptService(id),
    mutationKey: ["useDeleteSystemPromptReq"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetAllSystemPromptsReq"],
      });
    },
  });
};
