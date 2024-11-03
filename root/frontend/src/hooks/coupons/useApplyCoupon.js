import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "../../services/couponAPI.js";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/userContextAPI.jsx";
import { getMyInfo } from "../../services/userAPI.js";

function useApplyCoupon() {
  const { setUser } = useContext(UserContext);
  const { mutate, isSuccess } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: () => {
      toast.success("coupon applied");
      (async () => {
        const myInfo = await getMyInfo();
        setUser(myInfo);
      })();
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isSuccess };
}

export default useApplyCoupon;
