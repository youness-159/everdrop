import CouponForm from "../../../features/admin/CouponForm.jsx";
import useEditCoupon from "../../../hooks/coupons/useEditCoupon.js";
import useGettingSearchParam from "../../../hooks/useGettingSearchParam.js";
import useCoupon from "../../../hooks/coupons/useCoupon.js";
import Loader from "../../../ui/Loader.jsx";

function UpdateCoupon() {
  const couponId = useGettingSearchParam("id");
  const { coupon, isLoading } = useCoupon(couponId);

  const { mutate } = useEditCoupon(couponId);

  if (isLoading) return <Loader />;

  return <CouponForm defaultValues={coupon} mutate={mutate} />;
}

export default UpdateCoupon;
