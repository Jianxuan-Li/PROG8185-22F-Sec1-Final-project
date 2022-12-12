import request from "../../utils/request";

export const fetchProducts = async (data) => {
  return await request({
    url: "/api/v1/products/",
    method: "GET",
    data: data,
  });
};
