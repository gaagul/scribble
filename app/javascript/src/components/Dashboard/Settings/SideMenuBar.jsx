import React from "react";

import { Settings, Repeat, Category } from "neetoicons";
import { MenuBar } from "neetoui/layouts";
import { Link } from "react-router-dom";

const SideMenuBar = ({ url }) => (
  <MenuBar showMenu>
    <Link className="max-h-0.5 flex items-center" to={`${url}/general`}>
      <Settings size={35} />
      <MenuBar.Item
        description="Page Title, Brand Name & Meta Description"
        label="General"
      />
    </Link>
    <Link className="max-h-0.5 flex items-center" to={`${url}/redirection`}>
      <Repeat size={35} />
      <MenuBar.Item
        description="Create & configure redirection rules"
        label="Redirections"
      />
    </Link>
    <Link className="max-h-0.5 flex items-center" to={`${url}/categories`}>
      <Category size={35} />
      <MenuBar.Item
        description="Edit and Reorder KB Structure"
        label="Manage Categories"
      />
    </Link>
  </MenuBar>
);

export default SideMenuBar;
