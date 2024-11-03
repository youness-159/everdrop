import { useQuery } from "@tanstack/react-query";
import { getCoupon } from "../../services/couponAPI.js";

function useCoupon(id) {
  const {
    data: coupon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupon"],
    queryFn: () => getCoupon(id),
  });

  return { coupon, isLoading, error };
}

export default useCoupon;
