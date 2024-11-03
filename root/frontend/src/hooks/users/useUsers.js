import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/userAPI.js";

function UseUsers() {
  const {
    data: customers,
    error,
    isLoading,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  return { customers, isLoading, error };
}

export default UseUsers;
