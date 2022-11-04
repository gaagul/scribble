import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Analytics from "./Analytics";
import Articles from "./Articles";
import CreateArticle from "./Articles/Options/Create";
import EditArticle from "./Articles/Options/Edit";
import InvalidRoute from "./InvalidRoute";
import NavBar from "./NavBar";
import Settings from "./Settings";

const Dashboard = () => (
  <div className="h-screen w-full">
    <NavBar />
    <Switch>
      <Route exact component={Articles} key="ARTICLES_PATH" path="/articles" />
      <Route
        exact
        component={CreateArticle}
        key="CREATE_ARTICLE_PATH"
        path="/article/create"
      />
      <Route
        exact
        component={EditArticle}
        key="EDIT_ARTICLE_PATH"
        path="/article/:id/edit"
      />
      <Route component={Settings} path="/settings" />
      <Route component={Analytics} path="/analytics" />
      <Redirect exact from="/" to="/articles" />
      <Route component={InvalidRoute} path="/*" />
    </Switch>
  </div>
);

export default Dashboard;
