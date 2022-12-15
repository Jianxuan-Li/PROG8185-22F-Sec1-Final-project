import request from "@utils/request";
import { API_CART } from "@constants/apis";

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
