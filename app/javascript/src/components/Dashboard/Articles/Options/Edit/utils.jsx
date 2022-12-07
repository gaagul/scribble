import React from "react";

import { Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

export const buildColumnData = ({ setSelectedSchedule, setIsAlertOpen }) => [
  {
    title: "NEW STATUS",
    dataIndex: "new_status",
    key: "new_status",
    width: 250,
    render: (_, record) => (
      <Typography className="truncate w-48 overflow-hidden" style="h5">
        {record.new_status}
      </Typography>
    ),
  },
  {
    title: "SCHEDULED AT",
    dataIndex: "scheduled_at",
    key: "scheduled_at",
    width: 200,
    render: (_, record) => <Typography>{record.scheduled_at}</Typography>,
  },
  {
    title: "ACTION",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_, record) => (
      <div className="flex">
        <Button
          icon={Delete}
          style="secondary"
          onClick={() => {
            setSelectedSchedule(record);
            setIsAlertOpen(true);
          }}
        />
      </div>
    ),
  },
];
