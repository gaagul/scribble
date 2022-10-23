import axios from "axios";

const list = () => axios.get("/categories");

const create = payload => axios.post("/categories/", { category: payload });

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, { category: payload });

const destroy = ({ id, new_category_id }) =>
  axios.delete(`/categories/${id}`, {
    data: { new_category_id },
  });

const categoriesApi = {
  list,
  create,
  update,
  destroy,
};

export default categoriesApi;
