import CategoryForm from "../../../features/admin/CategoryForm.jsx";
import useEditCategory from "../../../hooks/categories/useEditCategory.js";
import useCategory from "../../../hooks/categories/useCategory.js";
import useGettingSearchParam from "../../../hooks/useGettingSearchParam.js";
import Loader from "../../../ui/Loader.jsx";

function UpdateCategory() {
  const categoryId = useGettingSearchParam("id");
  const { category, isLoading } = useCategory(categoryId);

  const { mutate } = useEditCategory(categoryId);

  if (isLoading) return <Loader />;

  return <CategoryForm defaultValues={category} mutate={mutate} />;
}

export default UpdateCategory;
