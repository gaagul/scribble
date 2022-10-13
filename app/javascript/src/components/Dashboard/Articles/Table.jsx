import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData } from "./utils";

const Table = ({ filteredArticles, destroyArticle }) => (
  <NeetoTable
    columnData={buildColumnData(destroyArticle)}
    rowData={filteredArticles}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);
export default Table;
