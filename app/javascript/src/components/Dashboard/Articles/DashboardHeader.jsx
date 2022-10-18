import React from "react";

import { Checkbox, Button, Dropdown } from "neetoui";
import { Header } from "neetoui/layouts";

const DashboardHeader = ({
  searchTitle,
  setSearchTitle,
  columnVisibility,
  setColumnVisibility,
}) => (
  <Header
    title=""
    actionBlock={
      <>
        <Dropdown
          buttonStyle="secondary"
          closeOnSelect={false}
          label="Columns"
          position="bottom-end"
        >
          <li>
            <Checkbox
              checked={columnVisibility.title}
              id="title"
              label="Title"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  title: !columnVisibility.title,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              checked={columnVisibility.date}
              id="date"
              label="Date"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  date: !columnVisibility.date,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              checked={columnVisibility.author}
              id="author"
              label="Author"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  author: !columnVisibility.author,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              checked={columnVisibility.category}
              id="category"
              label="Category"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  category: !columnVisibility.category,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              checked={columnVisibility.status}
              id="status"
              label="Status"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  status: !columnVisibility.status,
                })
              }
            />
          </li>
          <li>
            <Checkbox
              checked={columnVisibility.action}
              id="action"
              label="Action"
              onChange={() =>
                setColumnVisibility({
                  ...columnVisibility,
                  action: !columnVisibility.action,
                })
              }
            />
          </li>
        </Dropdown>
        <Button
          icon="ri-add-line"
          label="Add New Article"
          to="/article/create"
        />
      </>
    }
    searchProps={{
      onChange: e => {
        setSearchTitle(e.target.value);
      },
      value: searchTitle,
    }}
  />
);

export default DashboardHeader;
