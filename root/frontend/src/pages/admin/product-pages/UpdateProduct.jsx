import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import ProductForm from "../../../features/admin/ProductForm.jsx";
import useEditProduct from "../../../hooks/products/useEditProduct.js";
import useGettingSearchParam from "../../../hooks/useGettingSearchParam.js";
import useProduct from "../../../hooks/products/useProduct.js";
import Loader from "../../../ui/Loader.jsx";

function UpdateProduct() {
  const productId = useGettingSearchParam("id");
  const { product, isLoading } = useProduct(productId);

  const { mutate } = useEditProduct(productId);
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => queryClient.removeQueries(["product"]);
  }, [queryClient]);

  if (isLoading) return <Loader />;

  return (
    <ProductForm
      defaultValues={{
        ...product,
        colors: product.colors.join(","),
        sizes: product.sizes.join(","),
      }}
      mutate={mutate}
    />
  );
}

export default UpdateProduct;
