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
            if (
              window.confirm(`Do you really want to Delete ${record.title}`)
            ) {
              destroyArticle(record.slug);
            }
          }}
        />
      </div>
    ),
  },
];

export const searchWithTitle = (data, input) =>
  data.filter(item => {
    if (input !== "") {
      return item?.title?.toLowerCase()?.includes(input?.toLowerCase());
    }

    return item;
  });

export const filter = (articles, activeCategoryId, activeStatus) => {
  if (activeStatus !== "all" && activeCategoryId !== 0) {
    return articles.filter(
      article =>
        article.status === activeStatus &&
        article.category.id === activeCategoryId
    );
  } else if (activeStatus === "all" && activeCategoryId !== 0) {
    return articles.filter(article => article.category.id === activeCategoryId);
  } else if (activeStatus !== "all" && activeCategoryId === 0) {
    return articles.filter(article => article.status === activeStatus);
  }

  return articles;
};
