import request from "@utils/request";
import { API_PRODUCT, API_COMMENT, API_CART } from "@constants/apis";

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
};

export const addToCart = async (data) => {
  return await request({
    url: API_CART,
    method: "POST",
    data: data,
  });
};

export const postCommentOnProduct = async (id, data) => {
  return await request({
    url: API_COMMENT + "/" + id,
    method: "POST",
    data: data,
  });
};
