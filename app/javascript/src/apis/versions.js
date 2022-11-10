import axios from "axios";

const list = id => axios.get(`api/v1/articles/${id}/versions`);

const articleUpdate = ({ id, payload, time }) =>
  axios.put(`api/v1/articles/${id}?restore`, { article: payload, time });

const versionsApi = { list, articleUpdate };

export default versionsApi;
