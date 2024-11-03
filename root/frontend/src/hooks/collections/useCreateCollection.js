import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCollection } from "../../services/collectionAPI.js";

function useCreateCollection() {
  const { mutate } = useMutation({
    mutationFn: createCollection,
    onSuccess: () => toast.success("Collection is created"),
    onError: () => toast.error("Collection creation failed"),
  });

  return { mutate };
}

export default useCreateCollection;
