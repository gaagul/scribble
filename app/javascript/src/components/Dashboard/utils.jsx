import React from "react";

import { Typography, Tooltip, Table } from "neetoui";

export const expandableRender = record => (
  <div className="my-2 ml-16 max-w-md">
    <Table
      columnData={[
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          width: 10,
        },
        {
          title: "Visits",
          dataIndex: "count",
          key: "visits",
          width: 10,
        },
      ]}
      rowData={record.visits.map((visit, index) => ({
        ...visit,
        id: index,
      }))}
    />
  </div>
);

export const buildColumnData = () => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: 250,
    render: (_, record) => (
      <Tooltip
        content={record.title}
        followCursor="horizontal"
        position="bottom"
      >
        <a href={`/public/${record.slug}`} rel="noreferrer" target="_blank">
          <Typography className="truncate w-48 overflow-hidden" style="h5">
            {record.title}
          </Typography>
        </a>
      </Tooltip>
    ),
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: 200,
    render: (_, record) => <Typography>{record.category}</Typography>,
  },
  {
    title: "VISITS",
    dataIndex: "count",
    key: "visits",
    width: 100,
    sorter: (a, b) => a.count - b.count,
  },
];
