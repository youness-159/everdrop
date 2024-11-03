import CategoryForm from "../../../features/admin/CategoryForm.jsx";
import useCreateCategory from "../../../hooks/categories/useCreateCategory.js";

function NewCategory() {
  const { mutate } = useCreateCategory();
  return <CategoryForm mutate={mutate} />;
}

export default NewCategory;
