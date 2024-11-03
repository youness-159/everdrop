import { useQuery } from "@tanstack/react-query";
import { getProductFilters } from "../../services/productAPI.js";

function useProductFilters() {
  const {
    data: productFilters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productFilters"],
    queryFn: getProductFilters,
  });

  return { productFilters, isLoading, error };
}

export default useProductFilters;
