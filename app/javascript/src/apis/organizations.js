import axios from "axios";

const get = () => axios.get("api/v1/organizations");

const update = (id, payload) =>
  axios.put(`api/v1/organizations/${id}`, { organization: payload });

const organizationsApi = {
  get,
  update,
};
export default organizationsApi;
