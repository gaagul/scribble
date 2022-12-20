import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import FileSaver from "file-saver";
import { Button } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/Common/ProgressBar";

const DownloadReport = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const { refetch: generatePdf } = useQuery({
    queryKey: "generatePdf",
    queryFn: () => articlesApi.generatePdf(),
    enabled: false,
    onError: error => logger.error(error),
  });

  const { isLoading, refetch: downloadPdf } = useQuery({
    queryKey: "downloadPdf",
    queryFn: () => articlesApi.download(),
    onSuccess: ({ data }) =>
      FileSaver.saveAs(data, "scribble_articles_report.pdf"),
    enabled: false,
    onError: error => logger.error(error),
  });

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <Container>
      <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
        <h1>{message}</h1>
        <ProgressBar progress={progress} />
        <Button
          label="Download"
          loading={isLoading && progress !== 100}
          onClick={downloadPdf}
        />
      </div>
    </Container>
  );
};

export default DownloadReport;
