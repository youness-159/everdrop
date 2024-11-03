import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCollection } from "../../services/collectionAPI.js";

function useEditCollection(id) {
  const { mutate } = useMutation({
    mutationFn: (data) => updateCollection(id, data),
    onSuccess: () => toast.success("Collection is updated"),
    onError: () => toast.error("Collection updating failed"),
  });

  return { mutate };
}

export default useEditCollection;
