import { fetchData } from "./shopAPI.js";

export const getMonthlySales = async () => {
  return await fetchData("/orders/salesPerMonth");
};

export const getDailySales = async () => {
  return await fetchData("/orders/salesPerDay");
};

export const getWeeklySales = async () => {
  return await fetchData("/orders/salesPerWeek");
};

export const getTopSoldProducts = async () => {
  return await fetchData("/products?sort=sales&limit=5");
};

export const getMonthlyNewUsers = async () => {
  return await fetchData("/statistics/monthly-new-users");
};
