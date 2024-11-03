import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authAPI.js";
import toast from "react-hot-toast";

function useLogin() {
  const {
    mutate,
    data: loggedUser,
    isSuccess,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => toast.success("Login successfull"),
    onError: () => toast.error("Login failed"),
  });

  return { mutate, loggedUser, isSuccess };
}

export default useLogin;
