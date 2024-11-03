import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getOrders = async () => {
  return await fetchData("/orders");
};

export const getOrdersLength = async () => {
  return await fetchData("/orders/length");
};

export const getOrder = async (id) => {
  return await fetchData(`/orders/${id}`);
};

export const createOrder = async (order) => {
  return await postData("/orders", order);
};

export const updateOrder = async (id, order) => {
  return await updateData(`/orders/${id}`, order);
};

export const deleteOrder = async (id) => {
  return await deleteData(`/orders/${id}`);
};

export const getMyOrders = async () => {
  return await fetchData("/orders/my-orders");
};
