import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";

export const getCoupons = async () => {
  return await fetchData("/coupons");
};

export const getCouponsLength = async () => {
  return await fetchData("/coupons/length");
};

export const getCoupon = async (id) => {
  return await fetchData(`/coupons/${id}`);
};

export const createCoupon = async (coupon) => {
  return await postData("/coupons", coupon);
};

export const updateCoupon = async (id, coupon) => {
  return await updateData(`/coupons/${id}`, coupon);
};

export const deleteCoupon = async (id) => {
  return await deleteData(`/coupons/${id}`);
};

export const applyCoupon = async (data) => {
  return await updateData("/coupons/apply-coupon", data);
};
