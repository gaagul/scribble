import axios from "axios";

const login = payload => axios.post("api/v1/session", payload);

const authApi = {
  login,
};

export default authApi;
