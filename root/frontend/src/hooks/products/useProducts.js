import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productAPI.js";

function useProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, isLoading, error };
}

export default useProducts;
