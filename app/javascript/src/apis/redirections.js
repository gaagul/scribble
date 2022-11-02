import axios from "axios";

const list = () => axios.get("api/v1/redirections");

const create = payload =>
  axios.post("api/v1/redirections/", { redirection: payload });

const update = ({ id, payload }) =>
  axios.put(`api/v1/redirections/${id}`, { redirection: payload });

const destroy = id => axios.delete(`api/v1/redirections/${id}`);

const redirectionsApi = {
  list,
  create,
  destroy,
  update,
};

export default redirectionsApi;
