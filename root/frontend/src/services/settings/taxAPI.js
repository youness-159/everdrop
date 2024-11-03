import { deleteData, fetchData, postData, updateData } from "../shopAPI.js";

export const getTaxes = async () => {
  return await fetchData("/taxes");
};

export const getTax = async (id) => {
  return await fetchData(`/taxes/${id}`);
};

export const createTax = async (tax) => {
  return await postData("/taxes", tax);
};

export const updateTax = async (id, tax) => {
  return await updateData(`/taxes/${id}`, tax);
};

export const deleteTax = async (id) => {
  return await deleteData(`/taxes/${id}`);
};
