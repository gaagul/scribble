import React, { useState, useEffect } from "react";

import { PageLoader, Button, Typography } from "neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";
import VersionModal from "./VersionModal";

const Edit = () => {
  const [article, setArticle] = useState({});
  const [versions, setVersions] = useState([]);
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
      setVersions(article.versions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
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
      {logger.info(versions)}
      {!either(isNil, isEmpty)(article) ? (
        <div className="flex h-full w-full justify-between">
          <Form isEdit article={article} />
          <div className="w-2/6 border-l-2 pl-3">
            <Typography className="mt-2" style="h2">
              Version History
            </Typography>
            <Typography className="mt-1 mb-4" style="body2">
              Version history of Setting up an account in Scribble.
            </Typography>
            {versions.map(version => (
              <div className="mt-2 flex" key={version.time}>
                <div className="mr-4 text-gray-500">{version.time}</div>
                <Button
                  style="link"
                  label={
                    version.status === "Published"
                      ? "Article Published"
                      : "Article Drafted"
                  }
                  onClick={() => {
                    setSelectedVersion(version);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
          <VersionModal
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
