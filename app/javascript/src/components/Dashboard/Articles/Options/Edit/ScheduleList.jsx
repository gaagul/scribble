import React, { useEffect, useState } from "react";

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

const ScheduleList = ({ articleId }) => {
  const [loading, setLoading] = useState(true);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [schedule, setSchedule] = useState(new Date());
  const [schedules, setSchedules] = useState([
    { id: 1, new_status: "Publish", scheduled_at: "today" },
  ]);

  const fetchSchedules = async () => {
    try {
      const {
        data: { schedules },
      } = await schedulesApi.list(articleId);
      setSchedules(schedules);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSchedule = async newStatus => {
    try {
      setLoading(true);
      await schedulesApi.create({
        article_id: articleId,
        new_status: newStatus,
        scheduled_at: schedule,
      });
      await fetchSchedules();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsPaneOpen(false);
      setLoading(false);
    }
  };

  const handleDelete = async ({ articleId, scheduleId }) => {
    try {
      setLoading(true);
      await schedulesApi.destroy({
        article_id: articleId,
        schedule_id: scheduleId,
      });
      await fetchSchedules();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (loading) {
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
          <Callout className="w-full">
            <Typography style="body3">
              Only selected hour will be considered for scheduling
            </Typography>
          </Callout>
          <div className="w-full">
            <Typography>Date & Time</Typography>
            <DatePicker
              showTime
              disabledDate={current => current && current < new Date()}
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
            onClick={() => handleSchedule("Published")}
          />
          <Button
            icon={Clock}
            label="Unpublish Later"
            size="large"
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
            articleId,
            scheduleId: selectedSchedule.id,
          });
          setIsAlertOpen(false);
        }}
      />
    </div>
  );
};

export default ScheduleList;
