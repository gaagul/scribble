import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

const Edit = () => {
  const [article, setArticle] = useState([]);
  const { slug } = useParams();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(slug);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return <Form isEdit article={article} />;
};
export default Edit;
