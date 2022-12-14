import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { PageLoader, Typography, Label, Tag } from "neetoui";
import { Container } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";
import { useParams } from "react-router-dom";

import euiApi from "apis/eui";

const Article = ({ setCategoryId, setSelectedTitle }) => {
  const [article, setArticle] = useState({});

  const { slug } = useParams();

  const { isFetching } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => euiApi.show(slug),
    onSuccess: ({ data: { article } }) => {
      setArticle(article);
      setSelectedTitle(article.title);
      setCategoryId(article.category_id);
    },
    onError: error => logger.error(error),
    staleTime: Infinity,
  });

  if (isFetching) {
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
        <div className="mx-auto my-56">
          Invalid Article! please select an article from the menu
        </div>
      )}
    </>
  );
};

export default Article;
