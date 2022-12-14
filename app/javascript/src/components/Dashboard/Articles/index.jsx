import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { PageLoader, Typography, Button } from "neetoui";
import { Container, SubHeader } from "neetoui/layouts";
import { isNil, isEmpty, either, all } from "ramda";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Header from "./Header";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategoryIds, setActiveCategoryIds] = useState([]);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [count, setCount] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    date: true,
    author: true,
    category: true,
    status: true,
    action: true,
  });

  const { isLoading: categoriesLoading, refetch: refetchCategories } = useQuery(
    {
      queryKey: ["categories", categorySearchTerm],
      queryFn: () => categoriesApi.list(categorySearchTerm),
      onSuccess: ({ data: { categories } }) => setCategories(categories),
      onError: error => logger.error(error),
    }
  );

  const { isLoading: articlesLoading, refetch: refetchArticles } = useQuery({
    queryKey: [
      "articles",
      currentPage,
      activeCategoryIds,
      activeStatus,
      searchTitle,
    ],
    queryFn: () =>
      articlesApi.tableList({
        activeCategoryIds,
        activeStatus,
        searchTitle,
        currentPage,
      }),
    onSuccess: ({ data: { articles } }) => {
      setArticles(articles.all);
      setCount({
        draftCount: articles.draft_count,
        publishedCount: articles.published_count,
        allCount: articles.draft_count + articles.published_count,
        totalArticlesCount: articles.total_count,
        pageSize: articles.page_size,
      });
    },
    onError: error => logger.error(error),
  });

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      refetchArticles();
      refetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  if (
    all(either(isNil, isEmpty), [articles, categories]) &&
    (articlesLoading || categoriesLoading)
  ) {
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
        categorySearchTerm={categorySearchTerm}
        count={count}
        fetchCategories={refetchCategories}
        setActiveCategoryIds={setActiveCategoryIds}
        setActiveStatus={setActiveStatus}
        setCategorySearchTerm={setCategorySearchTerm}
        setCurrentPage={setCurrentPage}
      />
      <Container>
        <Header
          categories={categories}
          columnVisibility={columnVisibility}
          searchTitle={searchTitle}
          setColumnVisibility={setColumnVisibility}
          setCurrentPage={setCurrentPage}
          setSearchTitle={setSearchTitle}
        />
        {either(isNil, isEmpty)(articles) ? (
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
                  {count.totalArticlesCount} Articles
                </Typography>
              }
            />
            <Table
              allArticles={articles}
              columnVisibility={columnVisibility}
              currentPage={currentPage}
              destroyArticle={destroyArticle}
              pageSize={count.pageSize}
              searchTitle={searchTitle}
              setCurrentPage={setCurrentPage}
              totalArticlesCount={count.totalArticlesCount}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default Articles;
