import React, { useState } from "react";

import { Table as NeetoTable, Alert, Pagination } from "neetoui";

import { buildColumnData } from "./utils";

const Table = ({
  allArticles,
  destroyArticle,
  columnVisibility,
  currentPage,
  setCurrentPage,
  totalArticlesCount,
  pageSize,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});

  return (
    <>
      <NeetoTable
        allowRowClick={false}
        currentPageNumber={currentPage}
        defaultPageSize={9}
        handlePageChange={setCurrentPage}
        paginationProps={{ showQuickJumper: true }}
        rowData={allArticles}
        columnData={buildColumnData(
          setSelectedArticle,
          columnVisibility,
          setIsAlertOpen
        )}
      />
      <Pagination
        count={totalArticlesCount}
        navigate={setCurrentPage}
        pageNo={currentPage}
        pageSize={pageSize}
      />
      <Alert
        isOpen={isAlertOpen}
        message={`Are you sure you want to delete article: ${selectedArticle.title}`}
        title="You are permenantly deleting an Article!"
        onClose={() => setIsAlertOpen(false)}
        onSubmit={() => {
          destroyArticle(selectedArticle.id);
          setIsAlertOpen(false);
        }}
      />
    </>
  );
};
export default Table;
