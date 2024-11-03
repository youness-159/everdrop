import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/userAPI.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useResetPassword() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) =>
      resetPassword(data.token, data.password, data.passwordConfirm),
    onSuccess: () => {
      toast.success("Reset password successfully");
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutate };
}

export default useResetPassword;
