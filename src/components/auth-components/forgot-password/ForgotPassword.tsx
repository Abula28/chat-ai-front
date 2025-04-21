import { useState } from "react";
import { Button } from "../../common/button/Button";
import { Input } from "../../common/input/Input";
import { useForgotPasswordReq } from "../../../backend/requests/auth";
import { toast } from "react-toastify";
import { ErrorResT } from "../../../backend";
import useAuthModalStore from "../../../store/authModalStore";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPasswordReq();
  const { setAuthState } = useAuthModalStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email, {
      onSuccess: (data) => {
        toast.success(data.message);
        setAuthState("login");
      },
      onError: (error) => {
        toast.error((error as ErrorResT)?.response?.data?.message);
      },
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Enter Email"
        type="email"
        name="email"
        required
        onChange={handleChange}
        value={email}
      />

      <Button
        variant="primary"
        size="default"
        type="submit"
        loading={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default ForgotPassword;
