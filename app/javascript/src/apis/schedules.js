import axios from "axios";

const list = id => axios.get(`api/v1/articles/${id}/schedules`);

const create = ({ article_id, new_status, scheduled_at }) =>
  axios.post(`api/v1/articles/${article_id}/schedules`, {
    new_status,
    scheduled_at,
  });

const destroy = ({ article_id, schedule_id }) =>
  axios.delete(`api/v1/articles/${article_id}/schedules/${schedule_id}`);

const schedulesApi = { list, create, destroy };

export default schedulesApi;
