import axios from "axios";

const list = id => axios.get(`api/v1/articles/${id}/versions`);

const articleUpdate = ({ id, payload }) =>
  axios.put(`api/v1/articles/${id}?restore`, { article: payload });

const versionsApi = { list, articleUpdate };

export default versionsApi;
