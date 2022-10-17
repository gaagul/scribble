import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => (
  <NavLink
    className="mr-3 inline-flex items-center px-1 text-sm font-semibold leading-5 hover:text-indigo-500"
    exact={path === "/"}
    to={path}
    activeStyle={{
      fontWeight: "bold",
      color: "#667eea",
    }}
  >
    {name}
  </NavLink>
);

export default NavItem;
