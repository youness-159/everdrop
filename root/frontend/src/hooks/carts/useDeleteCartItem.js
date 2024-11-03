import { useMutation } from "@tanstack/react-query";
import { deleteCartItem } from "../../services/cartAPI.js";

function useDeleteCartItem() {
  const { mutate, isSuccess } = useMutation({
    mutationFn: deleteCartItem,
    onError: (err) => console.log(err.message),
  });

  return { mutate, isSuccess };
}

export default useDeleteCartItem;
