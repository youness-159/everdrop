import { HiOutlineCurrencyDollar, HiOutlineInboxStack } from "react-icons/hi2";

import AdminOutletSectionHeader from "../../../features/admin/AdminOutletSectionHeader.jsx";
import Search from "../../../ui/inputs/Search.jsx";
import SelectInput from "../../../ui/inputs/SelectInput.jsx";
import FromToInputs from "../../../ui/inputs/FromToInputs.jsx";
import { stockOptions } from "../../../utils/helpers.js";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import AdminTableHeaderColumn from "../../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableHeader from "../../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableBody from "../../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyRow from "../../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import Paginator from "../../../features/admin/admin-table/Paginator.jsx";
import useFilter from "../../../hooks/useFilter.jsx";
import AdminTableOperations from "../../../features/admin/admin-table/AdminTableOperations.jsx";
import Loader from "../../../ui/Loader.jsx";
import useProducts from "../../../hooks/products/useProducts.js";
import useDeleteProduct from "../../../hooks/products/useDeleteProduct.js";
import Form from "../../../ui/Form.jsx";
import { getProductsLength } from "../../../services/productAPI.js";
import {serverUrl} from "../../../../configs.js";

function AdminProducts() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminOutletSectionHeader
        title={"Products"}
        buttonName={"Add Product"}
        buttonLink={"new"}
      />

      <ProductsFilter />
      <ProductsTable products={products} />
    </>
  );
}

export default AdminProducts;

function ProductsFilter() {
  const { onSearchBy } = useFilter("products");

  return (
    <Form className={"px-6 py-6 flex justify-between gap-[4%]"}>
      <Search
        placeholder={"Products"}
        className={"w-[35%]"}
        name={"productName"}
        onSearch={onSearchBy("productName")}
      />
      <FromToInputs
        onFrom={onSearchBy("price[gte]")}
        onTo={onSearchBy("price[lte]")}
      >
        <HiOutlineCurrencyDollar />
      </FromToInputs>
      <Search
        placeholder={"SKU"}
        className={"w-[35%]"}
        name={"sku"}
        onSearch={onSearchBy("sku")}
      />
      <FromToInputs
        onFrom={onSearchBy("quantity[gte]")}
        onTo={onSearchBy("quantity[lte]")}
      >
        <HiOutlineInboxStack />
      </FromToInputs>
      <SelectInput
        defaultValue={"Stock"}
        options={stockOptions}
        onChange={onSearchBy("inStock")}
      />
    </Form>
  );
}

function ProductsTable({ products }) {
  return (
    <>
      <AdminTable>
        <AdminTableHeader>
          {["Image", "Title", "Price", "SKU", "Qty", "Stock"].map(
            (header, i) => (
              <AdminTableHeaderColumn key={i}>{header}</AdminTableHeaderColumn>
            ),
          )}
        </AdminTableHeader>
        <AdminTableBody>
          {products?.map((product) => (
            <AdminTableBodyRow key={product._id}>
              <AdminTableBodyColumn>
                <div className={"w-36 border flex items-center h-36 mx-auto"}>
                  <img
                    src={`${serverUrl}/imgs/products/${product.coverImage}`}
                    className={"w-full "}
                    alt="image"
                  />
                </div>
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>{product.name}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{product.price}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{product.sku}</AdminTableBodyColumn>
              <AdminTableBodyColumn>{product.quantity}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {product.inStock ? "In" : "Out"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>
                <ProductsTableOperations id={product._id} />
              </AdminTableBodyColumn>
            </AdminTableBodyRow>
          ))}
        </AdminTableBody>
      </AdminTable>
      <Paginator getRecordsFn={getProductsLength} />
    </>
  );
}

function ProductsTableOperations({ id }) {
  const { mutate } = useDeleteProduct();
  return <AdminTableOperations id={id} mutate={mutate} />;
}
