export interface PostSessionResT {
  sessionId: string;
}

export interface GetUserSessionsResT {
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetSessionMessagesResT {
  _id: string;
  sessionId: string;
  sender: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
