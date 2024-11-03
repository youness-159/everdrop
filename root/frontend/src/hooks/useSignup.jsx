import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authAPI.js";
import toast from "react-hot-toast";

function useSignup() {
  const {
    mutate,
    data: loggedUser,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup successfully");
    },
    onError: () => toast.error("Signup failed"),
  });

  return { mutate, isSuccess, isPending };
}

export default useSignup;
