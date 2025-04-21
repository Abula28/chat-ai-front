import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";
import { useResetPasswordReq } from "../../../backend/requests/auth";
import { toast } from "react-toastify";
import useAuthModalStore from "../../../store/authModalStore";

const ResetPassword = () => {
  const { setIsOpen } = useAuthModalStore();
  const [values, setValues] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useResetPasswordReq();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(
      {
        ...values,
        token: token!,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setIsSuccess(true);
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    );
  };

  const { token } = useParams();

  if (!token) {
    return <div>No token provided</div>;
  }

  if (isSuccess) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex w-full max-w-96 flex-col gap-6">
          <h1 className="mb-4 text-2xl font-bold">
            Password reset successfully
          </h1>
          <Button
            variant="primary"
            size="default"
            onClick={() => {
              navigate("/");
              setIsOpen(true);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-96 flex-col gap-6">
        <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="New Password"
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
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
