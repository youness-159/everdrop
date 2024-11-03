import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProduct } from "../../services/productAPI.js";
import { useNavigate } from "react-router-dom";

function useEditProduct(id) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries(["product"]);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product is updated");
      navigate(-1);
    },
    onError: () => toast.error("Product updating failed"),
  });
  return { mutate };
}

export default useEditProduct;
