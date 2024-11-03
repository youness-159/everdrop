import { useQuery } from "@tanstack/react-query";
import { getMyCart } from "../../services/cartAPI.js";

function useMyCart() {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["myCart"],
    queryFn: getMyCart,
  });

  return { cartItems, isLoading };
}

export default useMyCart;
