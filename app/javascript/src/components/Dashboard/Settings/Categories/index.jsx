import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";

import categoriesApi from "apis/categories";

import ArticleList from "./ArticleList";
import DeleteModal from "./DeleteModal";
import List from "./List";
import Pane from "./Pane";

const Categories = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryToEdit, setCategoryToEdit] = useState({});

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setSelectedCategory(categories[0]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async category => {
    try {
      await categoriesApi.create({ title: category });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsPaneOpen(false);
      fetchCategories();
    }
  };

  const updateCategory = async ({ id, title }) => {
    try {
      await categoriesApi.update({
        id,
        payload: {
          title,
        },
      });
      setIsPaneOpen(false);
      setCategoryToEdit({});
      await fetchCategories();
    } catch (error) {
      logger.error(error);
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
    <div className="flex w-full">
      <div className="w-4/12 space-y-8 px-4 pt-8">
        <div className="flex justify-between space-x-1">
          <Typography style="h2">Manage Categories</Typography>
          <Button icon={Plus} onClick={() => setIsPaneOpen(true)} />
        </div>
        <Pane
          categoryToEdit={categoryToEdit}
          createCategory={createCategory}
          isPaneOpen={isPaneOpen}
          setCategoryToEdit={setCategoryToEdit}
          setIsPaneOpen={setIsPaneOpen}
          updateCategory={updateCategory}
        />
        <List
          categories={categories}
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setCategoryToEdit={setCategoryToEdit}
          setIsDeleting={setIsDeleting}
          setIsPaneOpen={setIsPaneOpen}
          setLoading={setLoading}
          setSelectedCategory={setSelectedCategory}
        />
        <DeleteModal
          categories={categories}
          isDeleting={isDeleting}
          refetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setIsDeleting={setIsDeleting}
          setLoading={setLoading}
        />
      </div>
      <ArticleList
        categories={categories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Categories;
