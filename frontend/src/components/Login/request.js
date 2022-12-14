import request from "@utils/request";
import { API_MEMBER } from "@constants/apis";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

export const findOneMember = async (id) => {
  return await get(API_MEMBER + "/" + id);
};

export const createOneMember = async (data) => {
  return await request({
    url: API_MEMBER,
    method: "POST",
    data: data,
  });
}