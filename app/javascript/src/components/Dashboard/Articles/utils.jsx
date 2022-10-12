import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button } from "neetoui";

export const buildColumnData = () => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "40",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
    width: "40",
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
    width: "40",
  },
  {
    title: "CATEGORY",
    dataIndex: "categoryTitle",
    key: "categoryTitle",
    width: "40",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: "40",
  },
  {
    title: "",
    dataIndex: "actions",
    width: "40",
    render: () => (
      <div>
        <Button icon={Delete} />
        <Button icon={Edit} />
      </div>
    ),
  },
];
