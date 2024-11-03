import CollectionForm from "../../../features/admin/CollectionForm.jsx";
import useEditCollection from "../../../hooks/collections/useEditCollection.js";
import useGettingSearchParam from "../../../hooks/useGettingSearchParam.js";
import useCollection from "../../../hooks/collections/useCollection.js";
import Loader from "../../../ui/Loader.jsx";

function UpdateCollection() {
  const collectionId = useGettingSearchParam("id");
  const { collection, isLoading } = useCollection(collectionId);

  const { mutate } = useEditCollection(collectionId);

  if (isLoading) return <Loader />;

  return <CollectionForm defaultValues={collection} mutate={mutate} />;
}

export default UpdateCollection;
