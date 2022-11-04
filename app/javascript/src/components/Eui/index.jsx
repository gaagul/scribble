import React, { useEffect, useState } from "react";

import { Typography, Accordion, PageLoader, Input, Kbd } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";

import euiApi from "apis/eui";
import organizationsApi from "apis/organizations";

import Article from "./Article";
import SearchModal from "./SearchModal";

const Eui = () => {
  const [initialArticle, setInitialArticle] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [organization, setOrganization] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const handleKeyDown = event => {
    if (event.metaKey && event.keyCode === 75) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    loadData();
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <nav className="border max-w-7xl sticky top-0 mx-auto flex h-20 bg-white px-4">
        <div className="mt-6 w-1/5">
          <Input
            className="mt-auto"
            placeholder="Search for articles here"
            suffix={<Kbd keyName="⌘K" />}
            type="search"
            onClick={() => setShowModal(true)}
          />
        </div>
        <Typography className="m-auto" style="h3">
          {organization.title}
        </Typography>
      </nav>
      <div className="flex">
        {!either(isNil, isEmpty)(categories) ? (
          <>
            <MenuBar showMenu>
              <Accordion
                defaultActiveKey={categories.findIndex(
                  category => category.id === selectedCategoryId
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
            <SearchModal
              history={history}
              setShowModal={setShowModal}
              showModal={showModal}
            />
            <Switch>
              <Route
                exact
                path="/public/:slug"
                component={() => (
                  <Article
                    setCategoryId={id => setSelectedCategoryId(id)}
                    setSelectedTitle={title => setSelectedTitle(title)}
                  />
                )}
              />
              <Redirect
                exact
                from="/public"
                to={`/public/${initialArticle.slug}`}
              />
            </Switch>
          </>
        ) : (
          <div className=" mx-auto mt-10">No articles published</div>
        )}
      </div>
    </div>
  );
};

export default Eui;
