import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCategory } from "../../services/categoryAPI.js";

function useEditCategory(id) {
  const { mutate } = useMutation({
    mutationFn: (data) => updateCategory(id, data),
    onSuccess: () => toast.success("Category is updated"),
    onError: () => toast.error("Category updating failed"),
  });

  return { mutate };
}

export default useEditCategory;
