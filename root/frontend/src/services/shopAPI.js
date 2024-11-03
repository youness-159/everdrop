import axios from "axios";
import { removeNullValues } from "../utils/helpers.js";
import { baseUrl } from "../../configs.js";

let token;

export const fetchData = async (endpoint) => {
  token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, payload) => {
  token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${baseUrl}${endpoint}`,
      removeNullValues(payload),
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const updateData = async (endpoint, payload, contentType) => {
  token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseUrl}${endpoint}`,
      // removeNullValues(payload),
      payload,
      {
        headers: {
          "Content-Type": contentType ?? "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
