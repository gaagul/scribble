import axios from "axios";

const list = (categorySearchTerm = "") =>
  axios.get("api/v1/categories", {
    params: {
      search_title: categorySearchTerm,
    },
  });

const create = payload =>
  axios.post("api/v1/categories/", { category: payload });

const destroy = ({ id, new_category_id }) =>
  axios.delete(`api/v1/categories/${id}`, {
    data: { new_category_id },
  });

const update = ({ id, payload, quiet = false }) => {
  const path = quiet
    ? `api/v1/categories/${id}?quiet`
    : `api/v1/categories/${id}`;

  return axios.put(path, {
    category: payload,
  });
};

const categoriesApi = {
  list,
  create,
  update,
  destroy,
};

export default categoriesApi;
