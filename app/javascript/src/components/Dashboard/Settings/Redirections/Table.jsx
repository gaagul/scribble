import React, { useState } from "react";

import { Input, Button, Table as NeetoTable } from "@bigbinary/neetoui";
import { Edit, Delete, Check, Close } from "neetoicons";

import redirectionsApi from "apis/redirections";

const Table = ({ redirections, fetchRedirections }) => {
  const LOCALE = {
    emptyText: "No redirections added yet",
  };
  const [rowId, setRowId] = useState(0);
  const [editRedirection, setEditRedirection] = useState({
    id: "",
    from: "",
    to: "",
  });

  const updateRedirection = async () => {
    try {
      await redirectionsApi.update({
        id: editRedirection.id,
        payload: editRedirection,
      });
      fetchRedirections();
      setRowId();
    } catch (error) {
      logger.error(error);
    }
  };

  const destroyRedirection = async redirectionId => {
    try {
      await redirectionsApi.destroy(redirectionId);
      await fetchRedirections();
    } catch (error) {
      logger.error(error);
    }
  };

  const columns = [
    {
      title: "FROM PATH",
      dataIndex: "from",
      key: "from",
      render: (text, record) => {
        if (record.id === rowId) {
          return (
            <Input
              prefix="/"
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
              prefix="/"
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

  return (
    <NeetoTable columnData={columns} locale={LOCALE} rowData={redirections} />
  );
};
export default Table;
