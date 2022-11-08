import axios from "axios";

const list = (activeCategoryIds = [], activeStatus = "all", searchTitle = "") =>
  axios.get("api/v1/articles", {
    params: {
      category_ids: activeCategoryIds,
      status: activeStatus,
      search_title: searchTitle,
    },
  });
const show = slug => axios.get(`api/v1/articles/${slug}`);

const create = payload =>
  axios.post("api/v1/articles", {
    article: payload,
  });

const update = (id, payload) =>
  axios.put(`api/v1/articles/${id}`, {
    article: payload,
  });

const destroy = id => axios.delete(`api/v1/articles/${id}`);

const articlesApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default articlesApi;
