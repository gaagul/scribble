import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Button } from "neetoui";
import { Container, SubHeader } from "neetoui/layouts";
import { isNil, isEmpty, either } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Header from "./Header";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";

const Articles = () => {
  const [articles, setArticles] = useState({});
  const [categories, setCategories] = useState({});
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategoryIds, setActiveCategoryIds] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const [count, setCount] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    date: true,
    author: true,
    category: true,
    status: true,
    action: true,
  });

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list(activeCategoryIds, activeStatus, searchTitle);
      setArticles(articles);
      setLoading(false);
      setCount({
        draftCount: articles.draft_count,
        publishedCount: articles.published_count,
        allCount: articles.draft_count + articles.published_count,
      });
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
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticlesAndCategories = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchArticles(), fetchCategories()]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      fetchArticlesAndCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title: newCategoryTitle });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setNewCategoryTitle("");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [activeCategoryIds, activeStatus, searchTitle]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideMenuBar
        activeCategoryIds={activeCategoryIds}
        activeStatus={activeStatus}
        categories={categories}
        count={count}
        createCategory={createCategory}
        newCategoryTitle={newCategoryTitle}
        setActiveCategoryIds={setActiveCategoryIds}
        setActiveStatus={setActiveStatus}
        setNewCategoryTitle={setNewCategoryTitle}
      />
      <Container>
        <Header
          categories={categories}
          columnVisibility={columnVisibility}
          searchTitle={searchTitle}
          setColumnVisibility={setColumnVisibility}
          setSearchTitle={setSearchTitle}
        />
        {either(isNil, isEmpty)(articles.all) ? (
          <div className="mx-auto my-56 ">
            <h1 className="text-center text-xl leading-5">
              You have no articles to read
            </h1>
            <Button
              className="mt-6 ml-12"
              disabled={either(isEmpty, isNil)(categories)}
              label="Add new article"
              to="/article/create"
            />
          </div>
        ) : (
          <>
            <SubHeader
              leftActionBlock={
                <Typography component="h4" style="h4">
                  {articles.all.length} Articles
                </Typography>
              }
            />
            <Table
              allArticles={articles.all}
              columnVisibility={columnVisibility}
              destroyArticle={destroyArticle}
              searchTitle={searchTitle}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default Articles;
