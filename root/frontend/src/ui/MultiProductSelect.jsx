import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

import useProducts from "../hooks/products/useProducts.js";
import PropTypes from "prop-types";

function MultiProductSelect({ selectedProducts, setSelectedProducts }) {
  const { products, isLoading } = useProducts();

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  if (isLoading) return <div>Loading...</div>;

  const productOptions = products?.map((product) => ({
    label: product.name,
    value: product._id,
  }));

  return (
    <MultiSelect
      options={productOptions}
      value={selectedProducts}
      onChange={setSelectedProducts}
      labelledBy={"Products"}
      className={"text-zinc-700"}
    />
  );
}

export default MultiProductSelect;

MultiProductSelect.propTypes = {
  selectedProducts: PropTypes.array.isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
};
