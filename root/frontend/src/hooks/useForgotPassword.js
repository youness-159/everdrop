import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/userAPI.js";
import toast from "react-hot-toast";

function useForgotPassword() {
  const { mutate, isSuccess } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => toast.success("Check your email for reset password url"),
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isSuccess };
}

export default useForgotPassword;
