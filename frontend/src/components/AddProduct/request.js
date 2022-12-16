import request from "@utils/request";
import { API_PRODUCT } from "@constants/apis";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

export const createProduct = async (data) => {
  return await request({
    url: API_PRODUCT,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
