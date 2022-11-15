import React, { useEffect, useState } from "react";

import { Typography, Input, PageLoader, Button } from "@bigbinary/neetoui";
import { Check, Close, Plus } from "neetoicons";

import redirectionsApi from "apis/redirections";

import Table from "./Table";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newRedirection, setNewRedirection] = useState({ from: "", to: "" });

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.list();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createRedirection = async () => {
    try {
      await redirectionsApi.create(newRedirection);
      fetchRedirections();
    } catch (error) {
      logger.error(error);
    } finally {
      setNewRedirection({ from: "", to: "" });
      setAdding(false);
    }
  };

  const handleSubmit = () => {
    setAdding(false);
    createRedirection();
  };

  const keyPress = e => {
    if (
      e.key === "Enter" &&
      newRedirection.to !== "" &&
      newRedirection.from !== ""
    ) {
      handleSubmit();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const onClose = () => {
    setAdding(adding => !adding);
    setNewRedirection({ from: "", to: "" });
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-2 ">
      <Typography style="h2">Redirections</Typography>
      <Typography style="body3">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        friendly.
      </Typography>
      <div className="bg-blue-200 p-3">
        <Table
          fetchRedirections={fetchRedirections}
          redirections={redirections}
        />
        {adding && (
          <div
            className="mt-5 flex space-x-2"
            onKeyDown={e => {
              keyPress(e);
            }}
          >
            <Input
              autoFocus
              prefix="/"
              value={newRedirection.from}
              onChange={e => {
                setNewRedirection(newRedirection => ({
                  ...newRedirection,
                  from: e.target.value,
                }));
              }}
            />
            <Input
              prefix="/"
              value={newRedirection.to}
              onChange={e => {
                setNewRedirection(newRedirection => ({
                  ...newRedirection,
                  to: e.target.value,
                }));
              }}
            />
            <div className="flex space-x-1 pl-2">
              <Button
                icon={Check}
                disabled={
                  newRedirection.to === "" ||
                  newRedirection.from === "" ||
                  newRedirection.to === newRedirection.from
                }
                onClick={handleSubmit}
              />
              <Button icon={Close} onClick={onClose} />
            </div>
          </div>
        )}
        {!adding && (
          <Button
            className="mt-2"
            icon={Plus}
            iconPosition="left"
            label="Add New Redirection"
            style="text"
            onClick={() => setAdding(adding => !adding)}
          />
        )}
      </div>
    </div>
  );
};

export default Redirections;
