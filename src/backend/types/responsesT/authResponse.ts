import { CommonResT } from "./commonT";

export interface UserT {
  _id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResT extends CommonResT {
  token: string;
  user: UserT;
}

export interface LoginResT extends CommonResT {
  token: string;
  user: UserT;
}

export interface UserCheckInResT extends CommonResT {
  user: UserT;
}
