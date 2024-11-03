import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Products from "../../features/frontStore/Products.jsx";
import CheckboxInput from "../../ui/inputs/CheckboxInput.jsx";
import useCheckboxFilter from "../../hooks/useCheckboxFilter.js";
import useCategory from "../../hooks/categories/useCategory.js";
import Loader from "../../ui/Loader.jsx";
import { getProductFilters } from "../../services/productAPI.js";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  return (
    <div className={"px-64 "}>
      {!searchParams.get("name") ? <Title /> : <div className={"py-24"}></div>}

      <ProductsFilter />

      <Products />
    </div>
  );
}

export default ProductsPage;

function Title() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const { category, isLoading } = useCategory(categoryId);
  if (isLoading) return <Loader />;
  return (
    <h1 className={"uppercase text-6xl font-bold text-zinc-800 py-24"}>
      {category.name}
    </h1>
  );
}

function ProductsFilter() {
  const onSizeChange = useCheckboxFilter("products", "sizes");
  const onColorChange = useCheckboxFilter("products", "colors");
  const onBrandChange = useCheckboxFilter("products", "brands");

  // const { productFilters, isLoading } = useProductFilters();
  const [productFilters, setProductsFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setProductsFilter(await getProductFilters());
      setIsLoading(false);
    })();
  }, []);

  const renderCheckboxes = useCallback((items, onChange) => {
    return items.map((item, i) => (
      <CheckboxInput
        label={item}
        payload={item}
        onChange={onChange}
        size={"1.7rem"}
        key={i}
      />
    ));
  }, []);

  if (isLoading) return <Loader />;

  const sizes = productFilters.sizes;
  const colors = productFilters.colors;
  const brands = productFilters.brands;

  return (
    <aside className={"w-[20%] float-left space-y-9"}>
      <p className={"uppercase"}>Shop By</p>

      <Filter title={"Size"}>{renderCheckboxes(sizes, onSizeChange)}</Filter>

      <Filter title={"Color"}>{renderCheckboxes(colors, onColorChange)}</Filter>

      <Filter title={"Brand"}>{renderCheckboxes(brands, onBrandChange)}</Filter>
    </aside>
  );
}

function Filter({ children, title }) {
  return (
    <div>
      <h3
        className={
          "uppercase border-b pb-3 mt-6 mb-5 text-[1.6rem] text-zinc-700"
        }
      >
        {title}
      </h3>
      <div className={"space-y-2"}>{children}</div>
    </div>
  );
}
