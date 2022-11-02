import axios from "axios";

const listCategories = () => axios.get("api/v1/eui/categories");

const show = slug => axios.get(`api/v1/eui/articles/${slug}`);

const euiApi = {
  listCategories,
  show,
};

export default euiApi;
