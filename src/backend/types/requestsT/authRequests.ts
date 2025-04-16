export interface LoginReqT {
  email: string;
  password: string;
}

export interface RegisterReqT {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
