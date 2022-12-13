import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Check, Close, Plus } from "neetoicons";
import { Typography, Input, PageLoader, Button } from "neetoui";

import redirectionsApi from "apis/redirections";

import Table from "./Table";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newRedirection, setNewRedirection] = useState({ from: "", to: "" });

  const { isLoading, refetch: refetchRedirections } = useQuery({
    queryKey: ["redirections"],
    queryFn: () => redirectionsApi.list(),
    onSuccess: ({ data: { redirections } }) => {
      setRedirections(redirections);
    },
    onError: error => logger.error(error),
  });

  const createRedirection = async () => {
    try {
      await redirectionsApi.create(newRedirection);
      refetchRedirections();
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

  if (isLoading) {
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
          fetchRedirections={refetchRedirections}
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
