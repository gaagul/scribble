import React, { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Typography, PageLoader, Input, Kbd } from "neetoui";
import { Switch, Route } from "react-router-dom";

import organizationsApi from "apis/organizations";

import Preview from "./Preview";
import SearchModal from "./SearchModal";

const Eui = ({ history }) => {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchOrganization = async () => {
    try {
      const {
        data: { organization },
      } = await organizationsApi.get();
      setOrganization(organization);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = event => {
    if (event.metaKey && event.keyCode === 75) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchOrganization();
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <div className="mt-6 w-1/5">
          <Input
            className="mt-auto"
            placeholder="Search for articles here"
            prefix={<Search size={16} />}
            suffix={<Kbd keyName="⌘K" />}
            type="search"
            onClick={() => setShowModal(true)}
          />
        </div>
        <Typography className="m-auto" style="h3">
          {organization.title}
        </Typography>
      </nav>
      {showModal && (
        <SearchModal
          history={history}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <Switch>
        <Route exact component={Preview} path="/public" />
        <Route exact component={Preview} path="/public/:slug" />
      </Switch>
    </div>
  );
};

export default Eui;
