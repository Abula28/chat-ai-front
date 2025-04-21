export type PasswordsReqT = {
  password: string;
  passwordConfirm: string;
};

export interface LoginReqT {
  email: string;
  password: string;
}

export interface RegisterReqT extends PasswordsReqT {
  username: string;
  email: string;
}

export interface ResetPasswordReqT extends PasswordsReqT {
  token: string;
}
