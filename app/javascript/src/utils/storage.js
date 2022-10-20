const setToLocalStorage = ({ authToken, authOrganization, authUser }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authOrganization", JSON.stringify(authOrganization));
  localStorage.setItem("authUser", JSON.stringify(authUser));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export { setToLocalStorage, getFromLocalStorage };
