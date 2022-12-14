import React from "react";

import { Delete, Edit } from "neetoicons";
import { Button, Typography, Tooltip } from "neetoui";
import { filter } from "ramda";

const isVisible = column => column.visibility;

export const buildColumnData = (
  setSelectedArticle,
  columnVisibility,
  setIsAlertOpen
) =>
  filter(isVisible, [
    {
      title: "TITLE",
      dataIndex: "title",
      visibility: columnVisibility.title,
      key: "title",
      width: 250,
      render: (_, record) => (
        <Tooltip
          content={record.title}
          followCursor="horizontal"
          position="bottom"
        >
          <a href={`/article/${record.id}/edit`}>
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
      visibility: columnVisibility.date,
      key: "date",
      render: (_, record) =>
        record.status === "Published" ? (
          <Typography style="body2">{record.date}</Typography>
        ) : (
          <Typography style="body2">-</Typography>
        ),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      visibility: columnVisibility.author,
      key: "author",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      visibility: columnVisibility.category,
      key: "category",
      width: 200,
      render: (_, record) => <Typography>{record.category.title}</Typography>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      visibility: columnVisibility.status,
      key: "status",
    },
    {
      title: "",
      dataIndex: "action",
      visibility: columnVisibility.action,
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex">
          <Button
            className="mr-2"
            icon={Edit}
            style="secondary"
            to={`/article/${record.id}/edit`}
          />
          <Button
            icon={Delete}
            style="secondary"
            onClick={() => {
              setSelectedArticle(record);
              setIsAlertOpen(true);
            }}
          />
        </div>
      ),
    },
  ]);

export const filterCategories = (selectedCategories, newCategory) => {
  const index = selectedCategories.indexOf(newCategory);
  const arr = [...selectedCategories];
  if (index === -1) {
    arr.push(newCategory);
  } else {
    arr.splice(index, 1);
  }

  return arr;
};
