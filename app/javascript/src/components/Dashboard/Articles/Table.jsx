import React from "react";

import { Table as NeetoTable } from "neetoui";

import { buildColumnData, filterAndSearch } from "./utils";

const Table = ({
  filteredArticles,
  destroyArticle,
  searchTitle,
  activeStatus,
  columnVisibility,
  activeCategoryId,
}) => (
  <NeetoTable
    columnData={buildColumnData(destroyArticle, columnVisibility)}
    rowData={filterAndSearch(
      filteredArticles,
      activeCategoryId,
      activeStatus,
      searchTitle
    )}
  />
);
export default Table;
