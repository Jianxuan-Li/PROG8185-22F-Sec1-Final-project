import request from "@utils/request";
import { API_MEMBER } from "@constants/apis";

export const get = async (url) => {
  return await request({
    url,
    method: "GET",
    // data: data,
  });
};

export const findAllMembers = async () => {
  return await get(API_MEMBER);
};

export const findOneMember = async (id) => {
  return await get(API_MEMBER + "/" + id);
};

export const deleteOneMember = async (id) => {
  return await request({
    url: API_MEMBER + "/" + id,
    method: "DELETE",
  });
}

export const updateOneMember = async (id, data) => {
  return await request({
    url: API_MEMBER + "/" + id,
    method: "PUT",
    data: data,
  });
}

export const createOneMember = async (data) => {
  return await request({
    url: API_MEMBER,
    method: "POST",
    data: data,
  });
}