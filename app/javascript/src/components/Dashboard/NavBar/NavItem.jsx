import React from "react";

import { NavLink } from "react-router-dom";

const NavItem = ({ name, path }) => (
  <NavLink
    to={path}
    activeStyle={{
      fontWeight: "bold",
      color: "#667eea",
    }}
    className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5
      text-indigo-500 hover:text-indigo-500"
  >
    {name}
  </NavLink>
);

export default NavItem;
