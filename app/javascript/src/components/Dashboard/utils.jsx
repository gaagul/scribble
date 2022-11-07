import React from "react";

import { Typography, Tooltip } from "neetoui";

const handleClick = fetchArticles => {
  fetchArticles();
};

export const buildColumnData = fetchArticles => [
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
        <a
          href={`/public/${record.slug}`}
          rel="noreferrer"
          target="_blank"
          onClick={() => handleClick(fetchArticles)}
        >
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
    render: (_, record) => <Typography>{record.category.title}</Typography>,
  },
  {
    title: "VISITS",
    dataIndex: "visits",
    key: "views",
    width: 100,
    sorter: (a, b) => a.visits - b.visits,
  },
];
