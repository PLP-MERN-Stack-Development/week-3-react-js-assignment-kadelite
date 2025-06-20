import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await API.get("/posts", {
    params: { _page: page, _limit: limit },
  });
  return response.data;
};

export const searchPosts = async (query) => {
  const response = await API.get("/posts", {
    params: { q: query },
  });
  return response.data;
};
