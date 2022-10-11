import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "./Articles";
import NavBar from "./NavBar";

const Dashboard = () => (
  <div className=" h-screen w-full">
    <NavBar />
    <Switch>
      <Route exact component={Articles} key="ARTICLES_PATH" path="/articles" />
      <Route exact component={() => <h1>Settings Page</h1>} path="/settings" />
      <Redirect from="/" to="/articles" />
    </Switch>
  </div>
);

export default Dashboard;
