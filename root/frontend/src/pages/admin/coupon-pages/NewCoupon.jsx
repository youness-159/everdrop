import { createCoupon } from "../../../services/couponAPI.js";
import CouponForm from "../../../features/admin/CouponForm.jsx";
import useCreateCoupon from "../../../hooks/coupons/useCreateCoupon.js";

function NewCoupon() {
  const { mutate } = useCreateCoupon();
  return <CouponForm mutationFn={createCoupon} mutate={mutate} />;
}

export default NewCoupon;
