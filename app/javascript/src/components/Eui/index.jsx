import React, { useEffect, useState } from "react";

import { Typography, Accordion, PageLoader } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";

import euiApi from "apis/eui";
import organizationsApi from "apis/organizations";

import Article from "./Article";

const Eui = () => {
  const [initialArticle, setInitialArticle] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [organization, setOrganization] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await euiApi.listCategories();
      setCategories(categories);
      setInitialArticle(categories[0].articles[0]);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchOrganization = async () => {
    try {
      const {
        data: { organization },
      } = await organizationsApi.get();
      setOrganization(organization);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchOrganization(), fetchCategories()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <Typography className="m-auto" style="h3">
          {organization.title}
        </Typography>
      </nav>
      <div className="flex">
        <MenuBar showMenu>
          <Accordion defaultActiveKey={selectedCategory - 1}>
            {categories?.length ? (
              categories.map(category => (
                <Accordion.Item
                  className="border-b-2"
                  key={category.id}
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
        <Switch>
          <Route
            exact
            path="/public/:slug"
            component={() => (
              <Article
                setCategory={category => setSelectedCategory(category)}
              />
            )}
          />
          <Redirect
            exact
            from="/public"
            to={`/public/${initialArticle.slug}`}
          />
        </Switch>
      </div>
    </>
  );
};

export default Eui;
