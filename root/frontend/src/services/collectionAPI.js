import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getCollections = async () => {
  return await fetchData("/collections" + window.location.search);
};

export const getCollection = async (id) => {
  return await fetchData(`/collections/${id}`);
};

export const createCollection = async (collection) => {
  return await postData("/collections", collection);
};

export const updateCollection = async (id, collection) => {
  return await updateData(`/collections/${id}`, collection);
};

export const deleteCollection = async (id) => {
  return await deleteData(`/collections/${id}`);
};
