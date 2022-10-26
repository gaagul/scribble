import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData, searchWithTitle } from "./utils";

const Table = ({
  allArticles,
  destroyArticle,
  columnVisibility,
  searchTitle,
}) => (
  <NeetoTable
    allowRowClick={false}
    columnData={buildColumnData(destroyArticle, columnVisibility)}
    rowData={searchWithTitle(allArticles, searchTitle)}
  />
);
export default Table;
