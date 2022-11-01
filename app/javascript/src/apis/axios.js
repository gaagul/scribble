import axios from "axios";
import { Toastr } from "neetoui";

import { setToLocalStorage, getFromLocalStorage } from "utils/storage";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";
axios.defaults.baseURL = "/";
const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const organization = getFromLocalStorage("authOrganization");
  const user = getFromLocalStorage("authUser");
  if (token && organization && user) {
    axios.defaults.headers["X-Auth-Organization"] = organization;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({
      authToken: null,
      authOrganization: null,
      authUser: null,
    });
    setTimeout(() => (window.location.href = "/public"), 2000);
  }

  Toastr.error(
    axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
  );
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/public";
  }

  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};

export { setAuthHeaders, registerIntercepts };
