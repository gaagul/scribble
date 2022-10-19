const setToLocalStorage = ({ authToken, authOrganization }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authOrganization", JSON.stringify(authOrganization));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export { setToLocalStorage, getFromLocalStorage };
