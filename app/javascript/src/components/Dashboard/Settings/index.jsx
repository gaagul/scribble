import React from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import General from "./General";
import SideMenuBar from "./SideMenuBar";

const Settings = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="flex ">
      <SideMenuBar url={url} />
      <Switch>
        <Route component={General} path={`${path}/general`} />
      </Switch>
    </div>
  );
};

export default Settings;
