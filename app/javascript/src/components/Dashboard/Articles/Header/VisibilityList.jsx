import React from "react";

import { Dropdown, Checkbox } from "neetoui";

import { VISIBILITY_LIST } from "./constants";

const VisibilityList = ({ columnVisibility, setColumnVisibility }) => {
  const { Menu } = Dropdown;

  return (
    <Dropdown
      buttonStyle="secondary"
      closeOnSelect={false}
      label="Columns"
      position="bottom-end"
    >
      <Menu className="mb-2 ml-4 space-y-3">
        {VISIBILITY_LIST.map(({ title, key }) => (
          <Checkbox
            checked={columnVisibility[key]}
            id={key}
            key={key}
            label={title}
            style={{
              color: "#6366F1",
            }}
            onChange={() =>
              setColumnVisibility({
                ...columnVisibility,
                [key]: !columnVisibility[key],
              })
            }
          />
        ))}
      </Menu>
    </Dropdown>
  );
};

export default VisibilityList;
