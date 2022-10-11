import axios from "axios";

const list = () => axios.get("/articles");

const show = slug => axios.get(`/article/${slug}`);

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const update = (slug, payload) =>
  axios.post(`/articles/${slug}`, {
    article: payload,
  });

const destroy = slug => axios.delete(`/article/${slug}`);

const articlesApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default articlesApi;
