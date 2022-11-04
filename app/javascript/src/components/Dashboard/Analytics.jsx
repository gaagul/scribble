import React, { useState, useEffect } from "react";

import { PageLoader, Table } from "neetoui";

import articlesApi from "apis/articles";

import { buildColumnData } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);

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
    <div className="mx-auto mt-6 w-1/2">
      <Table
        allowRowClick={false}
        columnData={buildColumnData()}
        rowData={articles}
      />
    </div>
  );
};

export default Analytics;
