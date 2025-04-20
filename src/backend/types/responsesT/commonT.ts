import { AxiosError } from "axios";

export interface CommonResT {
  status: string;
  message: string;
}

export interface ErrorResT extends AxiosError<{ message: string }> {}
