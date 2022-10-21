import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData, filterAndSearch } from "./utils";

const Table = ({
  allArticles,
  destroyArticle,
  searchTitle,
  activeStatus,
  columnVisibility,
  activeCategoryId,
}) => (
  <NeetoTable
    columnData={buildColumnData(destroyArticle, columnVisibility)}
    rowData={filterAndSearch(
      allArticles,
      activeCategoryId,
      activeStatus,
      searchTitle
    )}
  />
);
export default Table;
