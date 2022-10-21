import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Label, Tag } from "neetoui";
import { Container } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import euiApi from "apis/eui";

const Article = ({ setCategory }) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { slug } = useParams();
  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await euiApi.show(slug);
      setArticle(article);
      setCategory(article.category);
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
        <Container>
          <div className="mt-5">
            <Typography className="mb-4" style="h2">
              {article.title}
            </Typography>
            <div className="mt-2 flex flex-row space-x-5">
              <Tag color="blue" label={article.categoryTitle} />
              <Label>{article.date}</Label>
            </div>
            <Typography className="mt-4" style="body2">
              {article.body}
            </Typography>
          </div>
        </Container>
      ) : (
        <div> Invalid Article! please select an article from the menu</div>
      )}
    </>
  );
};

export default Article;
