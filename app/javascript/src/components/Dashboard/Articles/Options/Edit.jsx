import React, { useState, useEffect } from "react";

import { PageLoader, Button, Typography, Tag } from "neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import versionsApi from "apis/versions";

import Form from "./Form";
import VersionModal from "./VersionModal";

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
        <div className="flex h-full w-full justify-between">
          <Form isEdit article={article} />
          <div className="h-full w-2/6 border-l-2 pl-3">
            <Typography className="mt-2" style="h3">
              Current Status:
              <Tag
                className="ml-3"
                label={article.status}
                size="large"
                style={article.status === "Published" ? "success" : "warning"}
              />
            </Typography>
            <Typography className="mt-6" style="h3">
              Version History
            </Typography>
            <Typography className="mt-1 mb-4" style="body2">
              Version history of {`${article.title}`}.
            </Typography>
            {!either(isNil, isEmpty)(versions) ? (
              versions.map(version => (
                <div className="mt-2 flex" key={version.version_id}>
                  <div className="mr-4 text-gray-500">{version.time}</div>
                  <Button
                    label={`Article ${version.event}`}
                    style="link"
                    onClick={() => {
                      setSelectedVersion(version);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))
            ) : (
              <Typography>No version History Found!</Typography>
            )}
          </div>
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
