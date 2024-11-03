import { useMutation } from "@tanstack/react-query";
import { updateCoupon } from "../../services/couponAPI.js";
import toast from "react-hot-toast";

function useEditCoupon(id) {
  const { mutate } = useMutation({
    mutationFn: (data) => updateCoupon(id, data),
    onSuccess: () => toast.success("Coupon is updated"),
    onError: () => toast.error("Coupon updating failed"),
  });

  return { mutate };
}

export default useEditCoupon;
