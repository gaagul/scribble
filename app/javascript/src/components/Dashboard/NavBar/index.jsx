import React from "react";

import { ExternalLink } from "neetoicons";
import { Button } from "neetoui";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

const NavBar = () => (
  <nav className="shadow bg-white">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex px-2 lg:px-0">
          <div className="hidden lg:flex">
            <Link
              to="/"
              className="mr-3 inline-flex items-center px-1 pt-1
      text-sm font-semibold leading-5"
            >
              Scribble
            </Link>
            <NavItem name="Articles" path="/articles" />
            <NavItem name="Settings" path="/settings" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button icon={ExternalLink} label="Preview" style="secondary" />
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
