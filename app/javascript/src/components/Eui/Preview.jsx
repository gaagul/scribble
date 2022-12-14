import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Typography, Accordion, PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { either, isEmpty, isNil } from "ramda";
import { useParams } from "react-router-dom";

import euiApi from "apis/eui";

import Article from "./Article";

const Preview = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const { slug } = useParams();

  const { isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: () => euiApi.listCategories(),
    onSuccess: ({ data: { categories } }) => {
      setCategories(categories);
      setCategoryId(categories[0].id);
      if (either(isNil, isEmpty)(slug) && !either(isNil, isEmpty)(categories)) {
        history.push(`public/${categories[0].articles[0].slug}`);
      }
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
    <div className="flex">
      {!either(isNil, isEmpty)(categories) && !either(isNil, isEmpty)(slug) ? (
        <>
          <MenuBar showMenu>
            <Accordion
              defaultActiveKey={categories.findIndex(
                category => category.id === categoryId
              )}
            >
              {categories.map(category => (
                <Accordion.Item
                  className="border-b-2"
                  key={category.id}
                  title={category.title}
                >
                  {category.articles.map(article => (
                    <Typography
                      key={article.id}
                      style="body2"
                      className={`ml-2 mb-2 cursor-pointer ${
                        article.title === selectedTitle && "text-indigo-600"
                      }`}
                      onClick={() => {
                        history.push(`/public/${article.slug}`);
                      }}
                    >
                      {article.title}
                    </Typography>
                  ))}
                </Accordion.Item>
              ))}
            </Accordion>
          </MenuBar>
          <Article
            setCategoryId={setCategoryId}
            setSelectedTitle={setSelectedTitle}
          />
        </>
      ) : (
        <div className=" mx-auto mt-10">No articles published</div>
      )}
    </div>
  );
};

export default Preview;
