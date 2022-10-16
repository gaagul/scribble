import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import Categories from "./Categories";
import General from "./General";
import Redirections from "./Redirections";
import SideMenuBar from "./SideMenuBar";

const Settings = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="flex ">
      <SideMenuBar url={url} />
      <Switch>
        <Route exact component={General} path={`${path}/general`} />
        <Route exact component={Categories} path={`${path}/categories`} />
        <Route exact component={Redirections} path={`${path}/redirection`} />
      </Switch>
    </div>
  );
};

export default Settings;
