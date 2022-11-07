import React, { useState, useEffect } from "react";

import { PageLoader, Table } from "neetoui";

import articlesApi from "apis/articles";

import { buildColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles.all);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-1/2 ">
      <Table
        allowRowClick={false}
        columnData={buildColumnData(fetchArticles)}
        currentPageNumber={currentPage}
        defaultPageSize={8}
        handlePageChange={setCurrentPage}
        paginationProps={{ showQuickJumper: true }}
        rowData={articles.sort((a, b) => b.visits - a.visits)}
      />
    </div>
  );
};

export default Analytics;
