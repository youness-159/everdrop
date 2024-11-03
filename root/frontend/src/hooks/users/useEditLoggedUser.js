import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateLoggedUser } from "../../services/userAPI.js";

function useEditLoggedUser() {
  const { mutate } = useMutation({
    mutationFn: updateLoggedUser,
    onSuccess: () => {
      toast.success("User updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`);
    },
  });

  return { mutate };
}

export default useEditLoggedUser;
