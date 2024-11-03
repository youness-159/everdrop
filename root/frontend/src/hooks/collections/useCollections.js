import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../../services/collectionAPI.js";

function UseCollections() {
  const {
    data: collections,
    error,
    isLoading,
  } = useQuery({ queryKey: ["collections"], queryFn: getCollections });

  return { collections, isLoading, error };
}

export default UseCollections;
