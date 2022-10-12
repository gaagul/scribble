import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData } from "./utils";

const Table = () => (
  <NeetoTable
    buildColumnData={() => buildColumnData()}
    rowData={[
      {
        title: "Article 1",
        date: "October 9th,2022",
        author: "Oliver Smith",
        categoryTitle: "Getting Started",
        status: "draft",
      },
    ]}
  />
);

export default Table;
