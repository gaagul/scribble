import axios from "axios";

const list = ({ activeCategoryIds = [] }) =>
  axios.get("api/v1/articles", {
    params: {
      category_ids: activeCategoryIds,
    },
  });

const tableList = ({
  activeCategoryIds = [],
  activeStatus = "all",
  searchTitle = "",
  currentPage = 1,
}) =>
  axios.get("api/v1/articles/table_list", {
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

const update = ({ id, payload, quiet = false }) => {
  const path = quiet ? `api/v1/articles/${id}?quiet` : `api/v1/articles/${id}`;

  return axios.put(path, {
    article: payload,
  });
};

const bulkUpdate = ({ selectedArticleIds = [], newCategoryId }) => {
  axios.post("api/v1/articles/bulk_update", {
    new_category_id: newCategoryId,
    article_ids: selectedArticleIds,
  });
};

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
  tableList,
  bulkUpdate,
};

export default articlesApi;
