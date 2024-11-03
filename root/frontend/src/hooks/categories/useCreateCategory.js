import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCategory } from "../../services/categoryAPI.js";

function useCreateCategory() {
  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => toast.success("Category is created"),
    onError: () => toast.error("Category creation failed"),
  });

  return { mutate };
}

export default useCreateCategory;
