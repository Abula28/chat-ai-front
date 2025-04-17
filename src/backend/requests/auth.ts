import { useMutation } from "@tanstack/react-query";
import { LoginReqT, RegisterReqT } from "../types";
import { getUserCheckIn, postLogin, postRegister } from "../services";
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
