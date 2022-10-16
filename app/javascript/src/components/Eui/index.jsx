import React, { useEffect, useState } from "react";

import { Typography, Accordion, PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useParams, useHistory } from "react-router-dom";

import euiApi from "apis/eui";

import Article from "./Article";

const Eui = () => {
  const [selectedArticle, setSelectedArticle] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await euiApi.listCategories();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <MenuBar showMenu>
        <Accordion defaultActiveKey={0}>
          {categories?.length ? (
            categories.map(category => (
              <Accordion.Item
                className="border-b-2"
                isOpen={category.title === selectedArticle.category}
                key={category.position}
                title={category.title}
              >
                {category.articles.map(article => (
                  <Typography
                    className="ml-2 mb-2 cursor-pointer"
                    key={article.id}
                    style="body2"
                    onClick={() => {
                      history.push(`/public/${article.slug}`);
                    }}
                  >
                    {article.title}
                  </Typography>
                ))}
              </Accordion.Item>
            ))
          ) : (
            <Accordion.Item title="No Data found" />
          )}
        </Accordion>
      </MenuBar>
      <Article
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        slug={slug}
      />
    </div>
  );
};

export default Eui;
