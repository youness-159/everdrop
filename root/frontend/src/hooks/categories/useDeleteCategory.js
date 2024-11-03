import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory } from "../../services/categoryAPI.js";

function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category is deleted");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => toast.error("Category deletion failed"),
  });

  return { mutate };
}

export default useDeleteCategory;
