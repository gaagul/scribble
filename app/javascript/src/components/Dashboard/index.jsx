import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import InvalidRoute from "./InvalidRoute";
import NavBar from "./NavBar";
import { DASHBOARD_ROUTES } from "./RouteConstants";

const Dashboard = () => (
  <div className="h-screen w-screen">
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect exact from="/" to="/articles" />
      <Route component={InvalidRoute} path="/*" />
    </Switch>
  </div>
);

export default Dashboard;
