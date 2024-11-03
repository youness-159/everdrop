import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../services/orderAPI.js";

function useMyOrders() {
  const {
    data: myOrders,
    isLoading,
    error,
  } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["my-orders"],
  });

  return { myOrders, isLoading, error };
}

export default useMyOrders;
