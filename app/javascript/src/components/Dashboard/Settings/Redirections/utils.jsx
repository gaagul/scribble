import React from "react";

import { Check, Close, Edit, Delete } from "neetoicons";
import { Input, Button, Tooltip, Typography } from "neetoui";

const handleKeyPress = (e, to, from, updateRedirection, setRowId, record) => {
  if (
    e.key === "Enter" &&
    to !== from &&
    record.to !== to &&
    record.from !== from
  ) {
    updateRedirection();
  } else if (e.key === "Escape") {
    setRowId(0);
  }
};

export const buildColumns = (
  editRedirection,
  setEditRedirection,
  rowId,
  setRowId,
  updateRedirection,
  setIsAlertOpen,
  setSelectedRedirection
) => [
  {
    title: "FROM PATH",
    dataIndex: "from",
    key: "from",
    render: (text, record) => {
      if (record.id === rowId) {
        return (
          <Input
            autoFocus
            prefix="/"
            value={editRedirection.from}
            onChange={e => {
              setEditRedirection(editRedirection => ({
                ...editRedirection,
                from: e.target.value,
              }));
            }}
            onKeyDown={e =>
              handleKeyPress(
                e,
                editRedirection.to,
                editRedirection.from,
                updateRedirection,
                setRowId,
                record
              )
            }
          />
        );
      }

      return (
        <Tooltip content={text} followCursor="horizontal" position="bottom">
          <Typography className="truncate w-48 overflow-hidden" style="h5">
            /{text}
          </Typography>
        </Tooltip>
      );
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
            prefix="/"
            value={editRedirection.to}
            onChange={e => {
              setEditRedirection(editRedirection => ({
                ...editRedirection,
                to: e.target.value,
              }));
            }}
            onKeyDown={e =>
              handleKeyPress(
                e,
                editRedirection.to,
                editRedirection.from,
                updateRedirection,
                setRowId,
                record
              )
            }
          />
        );
      }

      return (
        <Tooltip content={text} followCursor="horizontal" position="bottom">
          <Typography className="truncate w-48 overflow-hidden" style="h5">
            /{text}
          </Typography>
        </Tooltip>
      );
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
              disabled={
                editRedirection.to === editRedirection.from ||
                (editRedirection.to === record.to &&
                  editRedirection.from === record.from)
              }
              onClick={() => {
                updateRedirection();
              }}
            />
            <Button
              icon={Close}
              onClick={() => {
                setRowId(0);
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
              setSelectedRedirection(record);
              setIsAlertOpen(true);
            }}
          />
        </div>
      );
    },
  },
];
