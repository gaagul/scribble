import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";

import Login from "./components/Authentication/Login";
import Eui from "./components/Eui";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Eui} path="/public" />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
