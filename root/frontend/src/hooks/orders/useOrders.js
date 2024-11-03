import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/orderAPI.js";

function useOrders() {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  return { orders, isLoading, error };
}

export default useOrders;
