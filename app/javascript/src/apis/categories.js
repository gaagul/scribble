import axios from "axios";

const list = (categorySearchTerm = "") =>
  axios.get("/categories", {
    params: {
      search_title: categorySearchTerm,
    },
  });

const create = payload => axios.post("/categories/", { category: payload });

const destroy = ({ id, new_category_id }) =>
  axios.delete(`/categories/${id}`, {
    data: { new_category_id },
  });

const update = ({ id, payload, quiet = false }) => {
  const path = quiet ? `/categories/${id}?quiet` : `/categories/${id}`;

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
