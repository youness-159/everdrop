import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createProduct } from "../../services/productAPI.js";
import { useNavigate } from "react-router-dom";

function useCreateProduct() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product is created");
      navigate(-1);
    },
    onError: (err) => {
      toast.error("Product creation failed");
      console.log(err);
    },
  });
  return { mutate };
}

export default useCreateProduct;
