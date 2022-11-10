import React, { useState, useEffect } from "react";

import { PageLoader, Table, Pagination } from "neetoui";
import { isEmpty, isNil, either } from "ramda";

import articlesApi from "apis/articles";

import { buildColumnData, expandableRender } from "./utils";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationProps, setPaginationProps] = useState({});

  const fetchArticles = async () => {
    try {
      const {
        data: { analytics },
      } = await articlesApi.analytics(currentPage);
      setAnalytics(analytics.visits);
      setPaginationProps({
        count: analytics.count,
        pageSize: analytics.page_size,
      });
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 max-w-3xl">
      {!either(isEmpty, isNil)(analytics) ? (
        <>
          <Table
            allowRowClick={false}
            columnData={buildColumnData()}
            handlePageChange={setCurrentPage}
            rowData={analytics}
            expandable={{
              expandedRowRender: record => expandableRender(record),
              rowExpandable: record => record.count !== 0,
            }}
          />
          <Pagination
            className="float-right mr-6 mt-4"
            count={paginationProps.count}
            navigate={setCurrentPage}
            pageNo={currentPage}
            pageSize={paginationProps.pageSize}
          />
        </>
      ) : (
        <div className="my-20 flex justify-center">
          <h2 className="text-gray-500">No Published articles found</h2>
        </div>
      )}
    </div>
  );
};

export default Analytics;
