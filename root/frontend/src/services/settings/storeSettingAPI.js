import { deleteData, fetchData, postData, updateData } from "../shopAPI.js";

export const getStoreSettings = async () => {
  return await fetchData("/store-settings");
};

export const getStoreSetting = async (id) => {
  return await fetchData(`/store-settings/${id}`);
};

export const createStoreSetting = async (setting) => {
  return await postData("/store-settings", setting);
};

export const updateStoreSetting = async (id, setting) => {
  return await updateData(`/store-settings/${id}`, setting);
};

export const deleteStoreSetting = async (id) => {
  return await deleteData(`/store-settings/${id}`);
};
