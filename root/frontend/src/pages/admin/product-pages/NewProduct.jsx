import ProductForm from "../../../features/admin/ProductForm.jsx";
import useCreateProduct from "../../../hooks/products/useCreateProduct.js";

function NewProduct() {
  const { mutate } = useCreateProduct();

  return <ProductForm mutate={mutate} />;
}

export default NewProduct;
