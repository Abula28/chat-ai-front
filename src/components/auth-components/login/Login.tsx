import { Button, Input, TextView } from "../../common";
import { useLoginReq } from "../../../backend/requests/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import useUserStore from "../../../store/userStore";
import useAuthModalStore from "../../../store/authModalStore";
import { ErrorResT, LoginReqT } from "../../../backend";

const Login = () => {
  const { setData } = useUserStore();
  const { mutate, isPending } = useLoginReq();
  const { setIsOpen, setAuthState } = useAuthModalStore();
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
          (error as ErrorResT).response?.data?.message ||
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

      <div className="flex w-full justify-end">
        <TextView
          type="paragraph-small"
          weight="medium"
          className="cursor-pointer text-primary-100"
          onClick={() => setAuthState("forgotPassword")}
        >
          Forgot Password?
        </TextView>
      </div>

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
