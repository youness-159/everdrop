import { deleteData, fetchData, postData, updateData } from "./shopAPI.js";
import axios from "axios";
import { serverUrl } from "../../configs.js";

export const getUsers = async () => {
  return await fetchData("/users" + window.location.search);
};

export const getUsersLength = async () => {
  return await fetchData("/users/length");
};

export const getUser = async (id) => {
  return await fetchData(`/users/${id}`);
};

export const createUser = async (user) => {
  return await postData("/users", user);
};

export const updateUser = async (id, user) => {
  return await updateData(`/users/${id}`, user);
};

export const deleteUser = async (id) => {
  return await deleteData(`/users/${id}`);
};

export const updateLoggedUser = async (user) => {
  return await updateData(`/users/update-logged-user`, user);
};

export const forgotPassword = async ({ email }) => {
  return await axios.post(
    `${serverUrl}/api/v1/everdrop/users/forgot-password`,
    { email },
  );
};

export const resetPassword = async (token, password, passwordConfirm) => {
  return await axios.patch(
    `${serverUrl}/api/v1/everdrop/users/reset-password/${token}`,
    { password, passwordConfirm },
  );
};

export const verifyEmail = async ({ verificationCode, email }) => {
  console.log("email", email);
  console.log("verificationCode", verificationCode);
  return await axios.post(`${serverUrl}/api/v1/everdrop/users/verify-email`, {
    verificationCode,
    email,
  });
};

export const getMyInfo = async () => {
  return await fetchData(`/users/my-info`);
};
