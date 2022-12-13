import React, { useState } from "react";

import { useQueries } from "@tanstack/react-query";
import { PageLoader } from "neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import versionsApi from "apis/versions";

import ScheduleList from "./ScheduleList";
import VersionList from "./VersionList";
import VersionModal from "./VersionModal";

import Form from "../Form";

const Edit = () => {
  const [article, setArticle] = useState({});
  const [versions, setVersions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState({});

  const { id } = useParams();
  const history = useHistory();

  const onError = error => logger.error(error);

  const [
    { isFetching: articlesFetching, refetch: refetchArticle },
    { isFetching: versionsFetching, refetch: refetchVersions },
  ] = useQueries({
    queries: [
      {
        queryKey: ["article"],
        queryFn: () => articlesApi.show(id),
        onSuccess: ({ data: { article } }) => setArticle(article),
        onError,
      },
      {
        queryKey: ["versions"],
        queryFn: () => versionsApi.list(id),
        onSuccess: ({ data: { versions } }) => setVersions(versions),
        onError,
      },
    ],
  });

  if (articlesFetching || versionsFetching) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      {!either(isNil, isEmpty)(article) ? (
        <div className="flex h-full max-h-screen w-full justify-between">
          <div className="h-full w-8/12">
            <Form isEdit article={article} />
            <ScheduleList article={article} />
          </div>
          <VersionList
            article={article}
            setIsModalOpen={setIsModalOpen}
            setSelectedVersion={setSelectedVersion}
            versions={versions}
          />
          <VersionModal
            isModalOpen={isModalOpen}
            refetchArticle={refetchArticle}
            refetchVersions={refetchVersions}
            selectedVersion={selectedVersion}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
};
export default Edit;
