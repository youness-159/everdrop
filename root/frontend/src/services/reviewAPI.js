import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getReviews = async () => {
  return await fetchData("/reviews");
};

export const getReview = async (id) => {
  return await fetchData(`/reviews/${id}`);
};

export const createReview = async (review) => {
  return await postData("/reviews", review);
};

export const updateReview = async (id, review) => {
  return await updateData(`/reviews/${id}`, review);
};

export const deleteReview = async (id) => {
  return await deleteData(`/reviews/${id}`);
};
