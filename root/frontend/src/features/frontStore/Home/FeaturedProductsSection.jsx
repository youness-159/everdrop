import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useCollections from "../../../hooks/collections/useCollections.js";
import Loader from "../../../ui/Loader.jsx";
import Product from "../Product.jsx";

function FeaturedProductsSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("uniqueId", "FEATUREDPRODUCTS");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const { collections, isLoading } = useCollections();
  if (isLoading) return <Loader />;

  const featuredProducts = collections[0].products;

  return (
    <section className={" pt-32"}>
      <header
        className={
          "uppercase text-center text-3xl font-light text-zinc-600 mb-12"
        }
      >
        Featured Products
      </header>
      <div className={"flex justify-center gap-8 "}>
        {featuredProducts?.map((featuredProduct) => (
          <Product product={featuredProduct} key={featuredProduct._id} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
