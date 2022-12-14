import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Clock } from "neetoicons";
import {
  Callout,
  Table,
  Button,
  Typography,
  DatePicker,
  Pane,
  PageLoader,
  Alert,
} from "neetoui";
import { isNil, isEmpty, either } from "ramda";

import schedulesApi from "apis/schedules";

import { buildColumnData } from "./utils";

const ScheduleList = ({ article }) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [schedule, setSchedule] = useState(new Date());
  const [schedules, setSchedules] = useState([
    { id: 1, new_status: "Publish", scheduled_at: "today" },
  ]);

  const { isFetching, refetch: refetchSchedules } = useQuery({
    queryKey: ["schedules", article.id],
    queryFn: () => schedulesApi.list(article.id),
    onSuccess: ({ data: { schedules } }) => setSchedules(schedules),
    onError: error => logger.error(error),
  });

  const handleSchedule = async newStatus => {
    try {
      await schedulesApi.create({
        article_id: article.id,
        new_status: newStatus,
        scheduled_at: schedule,
      });
      refetchSchedules();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsPaneOpen(false);
    }
  };

  const handleDelete = async ({ article, scheduleId }) => {
    try {
      await schedulesApi.destroy({
        article_id: article.id,
        schedule_id: scheduleId,
      });
      refetchSchedules();
    } catch (error) {
      logger.error(error);
    }
  };

  if (isFetching) {
    return (
      <div className="h-full w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-8 px-32">
      <Button
        className="ml-6"
        icon={() => <Clock size={16} />}
        label="Schedule Later"
        onClick={() => setIsPaneOpen(true)}
      />
      <Callout className="mt-6 flex flex-col">
        {!either(isNil, isEmpty)(schedules) ? (
          <Table
            allowRowClick={false}
            rowData={schedules}
            columnData={buildColumnData({
              setSelectedSchedule,
              setIsAlertOpen,
            })}
          />
        ) : (
          <div>No schedules set</div>
        )}
      </Callout>
      <Pane isOpen={isPaneOpen} onClose={() => setIsPaneOpen(false)}>
        <Pane.Header>
          <Typography style="h3">Schedule</Typography>
        </Pane.Header>
        <Pane.Body className="flex flex-col space-y-6">
          <div className="w-full">
            <Typography>Date & Time</Typography>
            <DatePicker
              showTime
              disabledDate={current => current < new Date()}
              getPopupContainer={triggerNode => triggerNode.parentNode}
              value={schedule}
              onChange={setSchedule}
            />
          </div>
        </Pane.Body>
        <Pane.Footer className="flex space-x-4">
          <Button
            icon={Clock}
            label="Publish Later"
            size="large"
            disabled={
              (schedules.at(-1) &&
                schedules.at(-1).new_status === "Published") ||
              (isEmpty(schedules) && article.status === "Published")
            }
            onClick={() => handleSchedule("Published")}
          />
          <Button
            icon={Clock}
            label="Unpublish Later"
            size="large"
            disabled={
              (schedules.at(-1) && schedules.at(-1).new_status === "Draft") ||
              (isEmpty(schedules) && article.status === "Draft")
            }
            onClick={() => handleSchedule("Draft")}
          />
        </Pane.Footer>
      </Pane>
      <Alert
        isOpen={isAlertOpen}
        title="You are permenantly deleting a Schedule!"
        message={`Are you sure you want to delete the Schedule?
          New status : ${selectedSchedule.new_status},
          Scheduled at : ${selectedSchedule.scheduled_at}
          `}
        onClose={() => setIsAlertOpen(false)}
        onSubmit={() => {
          handleDelete({
            article,
            scheduleId: selectedSchedule.id,
          });
          setIsAlertOpen(false);
        }}
      />
    </div>
  );
};

export default ScheduleList;
