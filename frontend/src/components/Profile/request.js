import request from "@utils/request";
import { API_ORDER } from "@constants/apis";

import { getItem } from "@utils/storage";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

// get order by user id
export const findOrderByUser = async () => {
  return await get(API_ORDER + "/user/" + getItem("id"));
};
