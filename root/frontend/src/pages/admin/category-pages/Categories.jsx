import AdminOutletSectionHeader from "../../../features/admin/AdminOutletSectionHeader.jsx";
import Search from "../../../ui/inputs/Search.jsx";
import SelectInput from "../../../ui/inputs/SelectInput.jsx";
import { inStartMenuOptions, statusOptions } from "../../../utils/helpers.js";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import AdminTableHeader from "../../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBody from "../../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyRow from "../../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import useFilter from "../../../hooks/useFilter.jsx";
import Paginator from "../../../features/admin/admin-table/Paginator.jsx";
import AdminTableOperations from "../../../features/admin/admin-table/AdminTableOperations.jsx";
import Loader from "../../../ui/Loader.jsx";
import useCategories from "../../../hooks/categories/useCategories.js";
import useDeleteCategory from "../../../hooks/categories/useDeleteCategory.js";
import { getCategoriesLength } from "../../../services/categoryAPI.js";

function Categories() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminOutletSectionHeader
        title={"Categories"}
        buttonName={"Add Category"}
        buttonLink={"new"}
      />
      <CategoriesFilter />
      <CategoriesTable categories={categories} />
      <Paginator getRecordsFn={getCategoriesLength} />
    </>
  );
}

export default Categories;

function CategoriesFilter() {
  const { onSearchBy } = useFilter("categories");

  return (
    <form className={"px-6 py-6 flex justify-between gap-[4%]"}>
      <Search
        placeholder={"Category"}
        className={"w-[35%]"}
        name={"category"}
        onSearch={onSearchBy("name")}
      />

      <SelectInput
        defaultValue={"Status"}
        options={statusOptions}
        name={"status"}
        onChange={onSearchBy("status")}
      />
      <SelectInput
        defaultValue={"Include in Menu"}
        options={inStartMenuOptions}
        name={"inStartMenu"}
        onChange={onSearchBy("inStartMenu")}
      />
    </form>
  );
}

function CategoriesTable({ categories }) {
  return (
    <AdminTable>
      <AdminTableHeader>
        <AdminTableHeaderColumn>Category Name</AdminTableHeaderColumn>
        <AdminTableHeaderColumn>Status</AdminTableHeaderColumn>
        <AdminTableHeaderColumn>In Menu</AdminTableHeaderColumn>
      </AdminTableHeader>
      <AdminTableBody>
        {categories?.map((category) => (
          <AdminTableBodyRow key={category._id}>
            <AdminTableBodyColumn>{category.name}</AdminTableBodyColumn>
            <AdminTableBodyColumn>
              {category.status ? "Enable" : "Disable"}
            </AdminTableBodyColumn>
            <AdminTableBodyColumn>
              {category.inStartMenu ? "Yes" : "No"}
            </AdminTableBodyColumn>
            <AdminTableBodyColumn>
              <CategoriesTableOperations id={category._id} />
            </AdminTableBodyColumn>
          </AdminTableBodyRow>
        ))}
      </AdminTableBody>
    </AdminTable>
  );
}

function CategoriesTableOperations({ id }) {
  const { mutate } = useDeleteCategory();
  return <AdminTableOperations id={id} mutate={mutate} />;
}
