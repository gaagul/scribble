import React, { useState, useEffect } from "react";

import { PageLoader, Button, Typography, Tag, Callout } from "neetoui";
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
          <div className="h-full w-4/12 border-l-2 px-3">
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
            <Callout className="flex">
              <div className="flex flex-col">
                <Typography className="text-gray-500" style="body2">
                  {article.time}
                </Typography>
                <Typography className="text-gray-500" style="body2">
                  Current Version
                </Typography>
              </div>
              <Typography className="ml-auto" style="body2">{`Article ${
                article.status === "Draft" ? "Drafted" : "Published"
              }`}</Typography>
            </Callout>
            <div className="max-h-screen flex-col overflow-scroll">
              {!either(isNil, isEmpty)(versions) ? (
                versions.map(version => (
                  <div
                    className="mt-2 flex justify-between rounded-md border-2 border-gray-300 bg-gray-100 p-3"
                    key={version.version_id}
                  >
                    {version.event !== "update" &&
                    version.event.split("-")[0] !== "Restored" ? (
                      <>
                        <div className="flex-col">
                          <Typography className="text-gray-500" style="body2">
                            {version.time}
                          </Typography>
                          <Typography className="text-gray-500" style="body2">
                            {version.event}
                          </Typography>
                        </div>
                        <Typography
                          className="my-auto ml-auto text-indigo-600"
                          style="h5"
                        >
                          Article Restored
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography className="text-gray-500" style="body2">
                          {version.time}
                        </Typography>
                        <Button
                          style="link"
                          label={`Article ${
                            version.status === "Draft" ? "Drafted" : "Published"
                          }`}
                          onClick={() => {
                            setSelectedVersion(version);
                            setIsModalOpen(true);
                          }}
                        />
                      </>
                    )}
                    {/* <Button
                      style="link"
                      label={`Article ${
                        version.status === "Draft" ? "Drafted" : "Published"
                      }`}
                      onClick={() => {
                        setSelectedVersion(version);
                        setIsModalOpen(true);
                      }}
                    /> */}
                  </div>
                ))
              ) : (
                <Typography>No version History Found!</Typography>
              )}
            </div>
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
