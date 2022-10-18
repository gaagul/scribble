import React, { useState } from "react";

import { Table as NeetoTable } from "@bigbinary/neetoui";

import redirectionsApi from "apis/redirections";

import { buildColumns } from "./utils";

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

  return (
    <NeetoTable
      locale={LOCALE}
      rowData={redirections}
      columnData={buildColumns(
        editRedirection,
        setEditRedirection,
        rowId,
        setRowId,
        updateRedirection,
        destroyRedirection
      )}
    />
  );
};
export default Table;
