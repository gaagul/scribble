import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData } from "./utils";

const Table = ({ filteredArticles }) => (
  <NeetoTable
    columnData={buildColumnData()}
    rowData={filteredArticles}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);
export default Table;
