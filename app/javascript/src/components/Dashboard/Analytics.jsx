import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { PageLoader, Table, Pagination } from "neetoui";
import { isEmpty, isNil, either } from "ramda";

import articlesApi from "apis/articles";

import { buildColumnData, expandableRender } from "./utils";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationProps, setPaginationProps] = useState({});

  const { isLoading } = useQuery({
    queryKey: ["analytics", currentPage],
    queryFn: () => articlesApi.analytics(currentPage),
    onSuccess: ({ data: { analytics } }) => {
      setAnalytics(analytics.visits);
      setPaginationProps({
        count: analytics.count,
        pageSize: analytics.page_size,
      });
    },
    onError: error => logger.error(error),
  });

  if (isLoading) {
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
