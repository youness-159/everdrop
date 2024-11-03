import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryAPI.js";

function UseCategories() {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  return { categories, isLoading, error };
}

export default UseCategories;
