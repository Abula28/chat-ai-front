import axiosClient from "../axiosConfig";
import { endpoints } from "../endpoints";
import {
  LoginResT,
  RegisterResT,
  LoginReqT,
  RegisterReqT,
  UserCheckInResT,
} from "../types";

const { login, register, checkIn } = endpoints.auth;

export const postLogin = async (data: LoginReqT): Promise<LoginResT> => {
  const httpRequest = await axiosClient.post(login, data);
  return httpRequest.data;
};

export const postRegister = async (
  data: RegisterReqT,
): Promise<RegisterResT> => {
  const httpRequest = await axiosClient.post(register, data);
  return httpRequest.data;
};

export const getUserCheckIn = async (): Promise<UserCheckInResT> => {
  const httpRequest = await axiosClient.get(checkIn);
  return httpRequest.data;
};
