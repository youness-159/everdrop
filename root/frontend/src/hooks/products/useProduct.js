import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/productAPI.js";

function useProduct(id) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(id),
  });

  return { product, isLoading, error };
}

export default useProduct;
