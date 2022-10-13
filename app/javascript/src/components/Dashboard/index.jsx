import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "./Articles";
import NavBar from "./NavBar";
import CreateArticle from "./Pane/Create";
import EditArticle from "./Pane/Edit";

const Dashboard = () => (
  <div className=" h-screen w-full">
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
        path="/article/:slug/edit"
      />
      <Route exact component={() => <h1>Settings Page</h1>} path="/settings" />
      <Redirect from="/" to="/articles" />
    </Switch>
  </div>
);

export default Dashboard;
