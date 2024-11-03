import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/userAPI.js";

function useUser(id) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
  });

  return { user, isLoading, error };
}

export default useUser;
