import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/categoryAPI.js";

function useCategory(id) {
  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(id),
  });

  return { category, isLoading, error };
}

export default useCategory;
