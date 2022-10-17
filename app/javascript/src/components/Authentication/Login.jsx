import React, { useState } from "react";

import { Input, Button, PageLoader } from "neetoui";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "utils/storage";

const Login = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ password });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        title: response.data.title,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <form className="mx-auto my-48 max-w-md" onSubmit={handleSubmit}>
      <Input
        label="Password"
        placeholder="********"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button className="mt-8" label="Login" loading={loading} type="submit" />
    </form>
  );
};

export default Login;
