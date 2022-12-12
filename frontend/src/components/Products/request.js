import request from "@utils/request";
import { API_PRODUCT } from "@constants/apis";

export const fetchProducts = async (data) => {
  return await request({
    url: API_PRODUCT,
    method: "GET",
    data: data,
  });
};
