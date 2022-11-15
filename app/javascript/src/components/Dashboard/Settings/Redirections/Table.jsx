import React, { useState } from "react";

import { Table as NeetoTable, Alert } from "neetoui";

import redirectionsApi from "apis/redirections";

import { LOCALE } from "./constants";
import { buildColumns } from "./utils";

const Table = ({ redirections, fetchRedirections }) => {
  const [rowId, setRowId] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedRedirection, setSelectedRedirection] = useState({});
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
      setRowId(0);
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
    <>
      <NeetoTable
        locale={LOCALE}
        rowData={redirections}
        columnData={buildColumns(
          editRedirection,
          setEditRedirection,
          rowId,
          setRowId,
          updateRedirection,
          setIsAlertOpen,
          setSelectedRedirection
        )}
      />
      <Alert
        isOpen={isAlertOpen}
        message="Are you sure you want to delete the redirection, This action cannot be undone."
        title="You are permenantly deleting a Redirection!"
        onClose={() => setIsAlertOpen(false)}
        onSubmit={() => {
          destroyRedirection(selectedRedirection.id);
          setIsAlertOpen(false);
        }}
      />
    </>
  );
};
export default Table;
