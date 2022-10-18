import axios from "axios";

const listCategories = () => axios.get("/eui/categories");

const show = slug => axios.get(`/eui/articles/${slug}`);

const euiApi = {
  listCategories,
  show,
};

export default euiApi;
