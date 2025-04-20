export interface CreateSystemPromptReqT {
  content: string;
  category: string;
  role: string;
  label: string;
}

export interface UpdateSystemPromptReqT extends CreateSystemPromptReqT {
  id: string;
}
