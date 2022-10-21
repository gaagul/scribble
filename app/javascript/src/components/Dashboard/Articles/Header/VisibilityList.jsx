import React from "react";

import { Checkbox, Dropdown } from "neetoui";

const VisibilityList = ({ columnVisibility, setColumnVisibility }) => (
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
);

export default VisibilityList;
