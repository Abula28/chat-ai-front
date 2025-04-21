import { useMutation } from "@tanstack/react-query";
import { LoginReqT, RegisterReqT, ResetPasswordReqT } from "../types";
import {
  getUserCheckIn,
  postForgotPassword,
  postLogin,
  postRegister,
  postResetPassword,
} from "../services";
import { isAuth } from "../../utils";

export const useLoginReq = () => {
  return useMutation({
    mutationFn: (data: LoginReqT) => postLogin(data),
    mutationKey: ["useLoginReq"],
  });
};

export const useRegisterReq = () => {
  return useMutation({
    mutationFn: (data: RegisterReqT) => postRegister(data),
    mutationKey: ["useRegisterReq"],
  });
};

export const useUserCheckInReq = () => {
  return useMutation({
    mutationFn: () => {
      if (!isAuth()) {
        throw new Error("Unauthorized");
      }
      return getUserCheckIn();
    },
    mutationKey: ["useUserCheckInReq"],
  });
};

export const useForgotPasswordReq = () => {
  return useMutation({
    mutationFn: (email: string) => postForgotPassword(email),
    mutationKey: ["useForgotPasswordReq"],
  });
};

export const useResetPasswordReq = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordReqT) => postResetPassword(data),
    mutationKey: ["useResetPasswordReq"],
  });
};
