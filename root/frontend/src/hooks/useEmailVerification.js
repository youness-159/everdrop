import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../services/userAPI.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useEmailVerification() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("email verified successfully");
      navigate("/login");
    },
    onError: () => toast.error("email verification failed"),
  });

  return { mutate };
}

export default useEmailVerification;
