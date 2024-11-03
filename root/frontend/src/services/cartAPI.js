import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getCartItems = async () => {
  return await fetchData("/carts");
};

export const getCartItem = async (id) => {
  return await fetchData(`/carts/${id}`);
};

export const getMyCart = async () => {
  return await fetchData(`/carts/my-cart`);
};

export const addCartItem = async (item) => {
  return await postData("/carts", item);
};

export const updateCartItem = async (id, item) => {
  return await updateData(`/carts/${id}`, item);
};

export const deleteCartItem = async (id) => {
  return await deleteData(`/carts/${id}`);
};
