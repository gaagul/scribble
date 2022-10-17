import React from "react";

import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

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
        <Redirect exact from={`${path}`} to={`${path}/general`} />
      </Switch>
    </div>
  );
};

export default Settings;
