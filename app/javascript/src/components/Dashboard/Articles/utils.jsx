import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";

export const buildColumnData = destroyArticle => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: 300,
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
    width: 200,
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    render: (_, record) => <Typography>{record.category.title}</Typography>,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_, record) => (
      <div className="flex">
        <Button
          className="mr-2"
          icon={Edit}
          style="secondary"
          to={`/article/${record.slug}/edit`}
        />
        <Button
          icon={Delete}
          style="secondary"
          onClick={() => {
            destroyArticle(record.slug);
          }}
        />
      </div>
    ),
  },
];
