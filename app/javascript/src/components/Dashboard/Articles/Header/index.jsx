import React from "react";

import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";

import VisibilityList from "./VisibilityList";

const DashboardHeader = ({
  categories,
  searchTitle,
  setSearchTitle,
  columnVisibility,
  setColumnVisibility,
}) => (
  <Header
    title=""
    actionBlock={
      <>
        <VisibilityList
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
        <Button
          disabled={either(isEmpty, isNil)(categories)}
          label="Add new article"
          to="/article/create"
        />
      </>
    }
    searchProps={{
      onChange: e => {
        setSearchTitle(e.target.value);
      },
      value: searchTitle,
    }}
  />
);

export default DashboardHeader;
