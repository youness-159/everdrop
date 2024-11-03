import CollectionForm from "../../../features/admin/CollectionForm.jsx";
import useCreateCollection from "../../../hooks/collections/useCreateCollection.js";

function NewCollection() {
  const { mutate } = useCreateCollection();

  return <CollectionForm mutate={mutate} />;
}

export default NewCollection;
