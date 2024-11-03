import { createCoupon } from "../../services/couponAPI.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateCoupon() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      toast.success("Coupon is created");
      navigate(-1);
    },
    onError: () => toast.error("Coupon creation failed"),
  });

  return { mutate };
}

export default useCreateCoupon;
