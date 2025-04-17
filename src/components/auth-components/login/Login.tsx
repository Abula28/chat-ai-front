import { Button, Input } from "../../common";
import { useLoginReq } from "../../../backend/requests/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useUserStore from "../../../store/userStore";
import useAuthModalStore from "../../../store/authModalStore";
import { LoginReqT } from "../../../backend";

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const { setData } = useUserStore();
  const { mutate, isPending } = useLoginReq();
  const { setIsOpen } = useAuthModalStore();
  const [values, setValues] = useState<LoginReqT>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(values, {
      onSuccess(data) {
        toast.success(data.message);
        setData(data.user);
        localStorage.setItem("token", data.token);
        setIsOpen(false);
        window.location.reload();
      },
      onError(error) {
        toast.error(
          (error as AxiosError<ErrorResponse>).response?.data?.message ||
            "Something went wrong",
        );
      },
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

      <Button
        variant="primary"
        size="default"
        type="submit"
        loading={isPending}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
