export interface PostSessionReqT {
  title: string;
}

export interface PostMessageReqT {
  sessionId: string;
  content: string;
  systemId: string;
}
