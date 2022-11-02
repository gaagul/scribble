import axios from "axios";

const listCategories = () => axios.get("api/v1/eui/categories");

const listArticles = searchTitle =>
  axios.get("api/v1/eui/articles", {
    params: {
      search_title: searchTitle,
    },
  });

const show = slug => axios.get(`api/v1/eui/articles/${slug}`);

const euiApi = {
  listCategories,
  listArticles,
  show,
};

export default euiApi;
