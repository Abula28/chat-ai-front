import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSystemPrompt,
  postSystemPrompt,
} from "../services/knowledgeServices";
import { PostKnowledgeReqT } from "../types";

export const useGetSystemPrompts = () => {
  return useQuery({
    queryKey: ["useGetSystemPrompts"],
    queryFn: getSystemPrompt,
  });
};

export const usePostSystemPrompt = () => {
  return useMutation({
    mutationFn: (data: PostKnowledgeReqT) => postSystemPrompt(data),
    mutationKey: ["usePostSystemPrompt"],
  });
};
