import React, { useState, useEffect } from "react";

import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header, SubHeader } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import SideMenuBar from "./SideMenu";
import Table from "./Table";

const Articles = () => {
  const [articles, setArticles] = useState({});
  const [categories, setCategories] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [activeStatus, setActiveStatus] = useState("all");

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles);
      setFilteredArticles(articles.all);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticlesAndCategories = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchArticles(), fetchCategories()]);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(articles)) {
    return (
      <Container>
        <h1 className="text-center text-xl leading-5">
          You have no Articles to read 😔
        </h1>
      </Container>
    );
  }

  return (
    <div className="flex">
      <SideMenuBar
        activeCategoryId={activeCategoryId}
        activeStatus={activeStatus}
        categories={categories}
        setActiveCategoryId={setActiveCategoryId}
        setActiveStatus={setActiveStatus}
        count={{
          draftCount: articles.draft_count,
          publishedCount: articles.published_count,
          allCount: articles.draft_count + articles.published_count,
        }}
      />
      <Container>
        <Header
          actionBlock={<Button icon="ri-add-line" label="Add New Article" />}
          title=""
          searchProps={{
            onChange: () => {},
            value: "",
          }}
        />
        <SubHeader
          leftActionBlock={
            <Typography component="h4" style="h4">
              {articles.draft_count + articles.published_count} Articles
            </Typography>
          }
        />
        <Table filteredArticles={filteredArticles} />
      </Container>
    </div>
  );
};

export default Articles;