import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct } from "../../services/productAPI.js";

function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product is deleted");

      queryClient.invalidateQueries(["products"]);
    },
    onError: () => toast.error("Product deletion failed"),
  });

  return { mutate };
}

export default useDeleteProduct;
