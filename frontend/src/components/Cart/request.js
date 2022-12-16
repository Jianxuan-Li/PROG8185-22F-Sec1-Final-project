import request from "@utils/request";
import { API_CART, API_ORDER } from "@constants/apis";

import { getItem } from "@utils/storage";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

export const fetchCart = async () => {
  return await get(API_CART + "/user/" + getItem("id"));
};

export const addQuantity = async (id) => {
  return await request({
    url: API_CART + "/add/" + id,
    method: "PUT",
  });
};

export const reduceQuantity = async (id) => {
  return await request({
    url: API_CART + "/reduce/" + id,
    method: "PUT",
  });
};

export const removeItem = async (id) => {
  return await request({
    url: API_CART + "/" + id,
    method: "DELETE",
  });
};

export const removeByUserId = async (id) => {
  return await request({
    url: API_CART + "/user/" + id,
    method: "DELETE",
  });
}

export const createOrder = async (data) => {
  return await request({
    url: API_ORDER,
    method: "POST",
    data: data,
  });
}