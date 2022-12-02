import React, { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState({});

  const { id } = useParams();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(id);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticleVersions = async () => {
    try {
      const {
        data: { versions },
      } = await versionsApi.list(id);
      setVersions(versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchArticle(), fetchArticleVersions()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
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
            <ScheduleList articleId={article.id} />
          </div>
          <VersionList
            article={article}
            setIsModalOpen={setIsModalOpen}
            setSelectedVersion={setSelectedVersion}
            versions={versions}
          />
          <VersionModal
            fetchData={fetchData}
            isModalOpen={isModalOpen}
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
