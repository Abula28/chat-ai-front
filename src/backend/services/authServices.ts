import axiosClient from "../axiosConfig";
import { endpoints } from "../endpoints";
import {
  LoginResT,
  RegisterResT,
  LoginReqT,
  RegisterReqT,
  UserCheckInResT,
  ResetPasswordReqT,
} from "../types";

const { login, register, checkIn, forgotPassword, resetPassword } =
  endpoints.auth;

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

export const postForgotPassword = async (email: string) => {
  const httpRequest = await axiosClient.post(forgotPassword, { email });
  return httpRequest.data;
};

export const postResetPassword = async (data: ResetPasswordReqT) => {
  const httpRequest = await axiosClient.post(resetPassword(data.token), {
    password: data.password,
    passwordConfirm: data.passwordConfirm,
  });
  return httpRequest.data;
};
