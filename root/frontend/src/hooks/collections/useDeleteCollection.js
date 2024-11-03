import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCollection } from "../../services/collectionAPI.js";

function useDeleteCollection() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      toast.success("Collection is deleted");

      queryClient.invalidateQueries(["collections"]);
    },
    onError: () => toast.error("Collection deletion failed"),
  });

  return { mutate };
}

export default useDeleteCollection;
