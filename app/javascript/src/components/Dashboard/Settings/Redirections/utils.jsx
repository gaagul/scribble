import React from "react";

import { Check, Close, Edit, Delete } from "neetoicons";
import { Input, Button } from "neetoui";

export const buildColumns = (
  editRedirection,
  setEditRedirection,
  rowId,
  setRowId,
  updateRedirection,
  destroyRedirection
) => [
  {
    title: "FROM PATH",
    dataIndex: "from",
    key: "from",
    render: (text, record) => {
      if (record.id === rowId) {
        return (
          <Input
            value={editRedirection.from}
            onChange={e => {
              setEditRedirection(editRedirection => ({
                ...editRedirection,
                from: e.target.value,
              }));
            }}
          />
        );
      }

      return <p>{text}</p>;
    },
  },
  {
    title: "TO PATH",
    dataIndex: "to",
    key: "to",
    render: (text, record) => {
      if (rowId === record.id) {
        return (
          <Input
            value={editRedirection.to}
            onChange={e => {
              setEditRedirection(editRedirection => ({
                ...editRedirection,
                to: e.target.value,
              }));
            }}
          />
        );
      }

      return <p>{text}</p>;
    },
  },
  {
    title: "ACTIONS",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_, record) => {
      if (rowId === record.id) {
        return (
          <div className="flex space-x-2">
            <Button
              icon={Check}
              onClick={() => {
                updateRedirection();
              }}
            />
            <Button
              icon={Close}
              onClick={() => {
                setRowId();
              }}
            />
          </div>
        );
      }

      return (
        <div className="flex">
          <Button
            className="mr-2"
            icon={Edit}
            style="secondary"
            onClick={() => {
              setRowId(record.id);
              setEditRedirection(record);
            }}
          />
          <Button
            icon={Delete}
            style="secondary"
            onClick={() => {
              destroyRedirection(record.id);
            }}
          />
        </div>
      );
    },
  },
];
