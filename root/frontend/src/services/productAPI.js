import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getProducts = async () => {
  return await fetchData("/products" + window.location.search);
};

export const getProductsLength = async () => {
  return await fetchData("/products/length");
};

export const getProduct = async (id) => {
  return await fetchData(`/products/${id}`);
};

export const createProduct = async (product) => {
  const Obj = { ...product };
  const formData = new FormData();

  let i = 0;
  while (Obj["image-" + i]) {
    formData.append("images", Obj["image-" + i][0]);
    delete Obj["image" + i];
    i++;
  }

  const createdProduct = await postData("/products", Obj);

  return await updateData(
    `/products/${createdProduct._id}`,
    formData,
    "multipart/form-data",
  );
};

export const updateProduct = async (id, product) => {
  delete product["images"];
  delete product["_id"];
  delete product["__v"];
  delete product["createdAt"];

  product.coverImage = product["coverImage"][0];
  return await updateData(`/products/${id}`, product, "multipart/form-data");
};

export const deleteProduct = async (id) => {
  return await deleteData(`/products/${id}`);
};

export const getProductFilters = async () => {
  return await fetchData("/products/filters");
};
