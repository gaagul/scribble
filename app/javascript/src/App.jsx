import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageLoader } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import organizationsApi from "apis/organizations";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import DownloadReport from "components/DownloadReport";
import "lib/dayjs";
import { getFromLocalStorage } from "utils/storage";

import Login from "./components/Authentication/Login";
import Eui from "./components/Eui";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const {
        data: { organization },
      } = await organizationsApi.get();
      setIsPasswordEnabled(organization.is_password_enabled);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchOrganization();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Login} path="/login" />
          {isPasswordEnabled ? (
            <PrivateRoute
              component={Eui}
              condition={isLoggedIn}
              path="/public"
              redirectRoute="/login"
            />
          ) : (
            <Route component={Eui} path="/public" />
          )}
          <Route component={DownloadReport} path="/articles/report" />;
          <Route component={Dashboard} path="/" />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
