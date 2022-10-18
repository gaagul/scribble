import React from "react";

import { Table as NeetoTable } from "neetoui";

import { searchWithTitle, buildColumnData, filter } from "./utils";

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
    rowData={filter(
      searchWithTitle(filteredArticles, searchTitle),
      activeCategoryId,
      activeStatus
    )}
    onRowClick={() => {}}
    onRowSelect={() => {}}
  />
);
export default Table;
