import { useQuery } from "@tanstack/react-query";
import { getCollection } from "../../services/collectionAPI.js";

function useCollection(id) {
  const {
    data: collection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection"],
    queryFn: () => getCollection(id),
  });

  return { collection, isLoading, error };
}

export default useCollection;
