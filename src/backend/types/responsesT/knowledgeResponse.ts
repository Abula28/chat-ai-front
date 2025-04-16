export interface GetKnowledgeResT {
  status: string;
  message: string;
  prompts: {
    _id: string;
    content: string;
    category: string;
    role: string;
    label: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
