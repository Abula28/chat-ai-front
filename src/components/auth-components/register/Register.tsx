import { useState } from "react";
import { Input } from "../../common";
import { Button } from "../../common";
import { RegisterReqT } from "../../../backend";
import { useRegisterReq } from "../../../backend";
import useAuthModalStore from "../../../store/authModalStore";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const Register = () => {
  const [values, setValues] = useState<RegisterReqT>({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });

  const { mutate, isPending } = useRegisterReq();
  const { setAuthState } = useAuthModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(values, {
      onSuccess: (data) => {
        setAuthState("login");
        toast.success(data.message);
        setValues({
          email: "",
          password: "",
          passwordConfirm: "",
          username: "",
        });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data.message || "An error occurred");
      },
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Username"
        type="text"
        name="username"
        required
        onChange={handleChange}
        value={values.username}
      />
      <Input
        placeholder="Email"
        type="email"
        name="email"
        required
        onChange={handleChange}
        value={values.email}
      />
      <Input
        placeholder="Password"
        type="password"
        name="password"
        required
        onChange={handleChange}
        value={values.password}
      />

      <Input
        placeholder="Confirm Password"
        type="password"
        name="passwordConfirm"
        required
        onChange={handleChange}
        value={values.passwordConfirm}
      />

      <Button
        variant="primary"
        size="default"
        type="submit"
        loading={isPending}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
