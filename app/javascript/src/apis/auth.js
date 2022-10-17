import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const authApi = {
  login,
};

export default authApi;
