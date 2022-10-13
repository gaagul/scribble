import axios from "axios";

const list = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const update = (slug, payload) =>
  axios.put(`/articles/${slug}`, {
    article: payload,
  });

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default articlesApi;
