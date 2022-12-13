import request from "@utils/request";
import { API_PRODUCT, API_COMMENT } from "@constants/apis";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

export const fetchProducts = async () => {
  return await get(API_PRODUCT);
};

export const fetchOneProduct = async (id) => {
  return await get(API_PRODUCT + "/" + id);
};

export const fetchComments = async (id) => {
  return await get(API_COMMENT + "/" + id);
}