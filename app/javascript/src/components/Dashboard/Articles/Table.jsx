import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData } from "./utils";

const Table = ({ allArticles, destroyArticle, columnVisibility }) => (
  <NeetoTable
    allowRowClick={false}
    columnData={buildColumnData(destroyArticle, columnVisibility)}
    rowData={allArticles}
  />
);
export default Table;
