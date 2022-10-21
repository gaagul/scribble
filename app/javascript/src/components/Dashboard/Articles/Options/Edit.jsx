import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

const Edit = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(slug);
      setArticle(article);
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
      {!either(isNil, isEmpty)(article) ? (
        <Form isEdit article={article} />
      ) : (
        history.push("/")
      )}
    </>
  );
};
export default Edit;
