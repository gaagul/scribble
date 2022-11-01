import React, { useState } from "react";

import { Table as NeetoTable, Alert } from "neetoui";

import { buildColumnData } from "./utils";

const Table = ({ allArticles, destroyArticle, columnVisibility }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});

  return (
    <>
      <NeetoTable
        allowRowClick={false}
        rowData={allArticles}
        columnData={buildColumnData(
          setSelectedArticle,
          columnVisibility,
          setIsAlertOpen
        )}
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
