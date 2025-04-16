import axiosClient from "../axiosConfig";
import { endpoints } from "../endpoints";
import { GetKnowledgeResT, PostKnowledgeReqT } from "../types";

const { getKnowledge, admin } = endpoints;
export const getSystemPrompt = async (): Promise<GetKnowledgeResT> => {
  const response = await axiosClient.get(getKnowledge);
  return response.data;
};

export const postSystemPrompt = async (
  data: PostKnowledgeReqT,
): Promise<GetKnowledgeResT> => {
  const response = await axiosClient.post(admin.createPrompt, data);
  return response.data;
};
