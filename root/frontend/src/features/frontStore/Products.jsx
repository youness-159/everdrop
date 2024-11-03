import Loader from "../../ui/Loader.jsx";
import Product from "./Product.jsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useProducts from "../../hooks/products/useProducts.js";
import Paginator from "../admin/admin-table/Paginator.jsx";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useProducts();

  useEffect(() => {}, [searchParams]);

  if (isLoading) return <Loader />;

  return (
    <main
      className={
        "grid grid-cols-3 gap-32   justify-items-center relative h-[360]"
      }
    >
      {products?.map((product) => (
        <Product product={product} key={product._id} />
      ))}

      <Paginator className={"w-full mt-6 col-span-full"} />
    </main>
  );
}

export default Products;
