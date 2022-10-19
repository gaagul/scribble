import React, { useState, useEffect } from "react";

import { PageLoader, Typography } from "@bigbinary/neetoui";
import { Input, Button } from "neetoui";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import organizationsApi from "apis/organizations";
import { setToLocalStorage } from "utils/storage";

const GuestLogin = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [organizationName, setOrganizationName] = useState();

  const fetchOrganizationName = async () => {
    try {
      setLoading(true);
      const response = await organizationsApi.get();
      setOrganizationName(response.data.organization.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await authApi.login({ password });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        authOrganization: response.data.title,
      });
      setAuthHeaders();
      window.location.href = "/public";
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationName();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <Typography className="m-auto" style="h3">
          {organizationName}
        </Typography>
      </nav>
      <div className="m-auto mt-10 max-w-md">
        <Typography style="h2">
          {organizationName} is password protected!
        </Typography>
        <Typography className="mb-5" style="body2">
          Enter the password to gain access to {organizationName}
        </Typography>
        <Input
          required
          className="mb-6"
          id="user_password"
          label="Password"
          placeholder="******"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          label="Continue"
          style="primary"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </>
  );
};
export default GuestLogin;
