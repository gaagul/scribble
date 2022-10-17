import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Label, Tag } from "neetoui";
import { Container } from "neetoui/layouts";

import euiApi from "apis/eui";

const Article = ({ slug }) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await euiApi.show(slug);
      setArticle(article);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      {slug && (
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
      )}
    </Container>
  );
};

export default Article;
