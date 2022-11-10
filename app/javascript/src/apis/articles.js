import axios from "axios";

const list = (
  activeCategoryIds = [],
  activeStatus = "all",
  searchTitle = "",
  currentPage = 1
) =>
  axios.get("api/v1/articles", {
    params: {
      category_ids: activeCategoryIds,
      status: activeStatus,
      search_title: searchTitle,
      current_page: currentPage,
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

const analytics = currentPage =>
  axios.get("api/v1/articles/analytics", {
    params: {
      current_page: currentPage,
    },
  });

const articlesApi = {
  list,
  show,
  create,
  update,
  destroy,
  analytics,
};

export default articlesApi;
