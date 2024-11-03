import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoupon } from "../../services/couponAPI.js";
import toast from "react-hot-toast";

function useDeleteCoupon() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      toast.success("Coupon is deleted");
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: () => toast.error("Coupon deletion failed"),
  });

  return { mutate };
}

export default useDeleteCoupon;
