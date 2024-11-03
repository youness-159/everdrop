import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCartItem } from "../../services/cartAPI.js";

function useCreateCartItem() {
  const { mutate } = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      toast.success("Item added to cart");
    },
    onError: (err) => {
      toast.error("Failed to add item to cart");
      console.log(err);
    },
  });
  return { mutate };
}

export default useCreateCartItem;
