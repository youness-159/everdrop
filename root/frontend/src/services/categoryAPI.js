import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getCategories = async () => {
  if (window.location.pathname.split("/").includes("admin"))
    return await fetchData("/categories" + window.location.search);

  return await fetchData("/categories");
};

export const getCategoriesLength = async () => {
  return await fetchData("/categories/length");
};

export const getCategory = async (id) => {
  return await fetchData(`/categories/${id}`);
};

export const createCategory = async (category) => {
  return await postData("/categories", category);
};

export const updateCategory = async (id, category) => {
  return await updateData(`/categories/${id}`, category);
};

export const deleteCategory = async (id) => {
  return await deleteData(`/categories/${id}`);
};
