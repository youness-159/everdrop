import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrder } from "../../services/orderAPI.js";

function useCreateOrder() {
  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => toast.success("Order is created"),
    onError: () => toast.error("Order creation failed"),
  });
  return { mutate };
}

export default useCreateOrder;
