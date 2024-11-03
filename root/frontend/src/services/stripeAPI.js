import { fetchData } from "./shopAPI.js";

export const getCheckoutSession = async () => {
  return await fetchData(`/orders/checkout-session`);
};
