import request from "@utils/request";
import { API_MEMBER, API_LOGIN } from "@constants/apis";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
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
};

export const loginMember = async (data) => {
  return await request({
    url: API_LOGIN,
    method: "POST",
    data: data,
  });
};
