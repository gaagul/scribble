import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";

import categoriesApi from "apis/categories";

import Add from "./Add";
import DeleteModal from "./DeleteModal";
import List from "./List";

const Categories = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
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
      setIsAdding(false);
      fetchCategories();
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
    <div className="mx-auto mt-10 space-y-2">
      <Typography style="h2">Manage Categories</Typography>
      <Typography style="body2">
        Create and configure the categories inside your scribble.
      </Typography>
      {isAdding ? (
        <Add createCategory={createCategory} setIsAdding={setIsAdding} />
      ) : (
        <Button
          icon={Plus}
          iconPosition="left"
          label="Add New Category"
          style="link"
          onClick={() => setIsAdding(true)}
        />
      )}
      <List
        categories={categories}
        fetchCategories={fetchCategories}
        setCategoryToDelete={setSelectedCategory}
        setIsDeleting={setIsDeleting}
      />
      <DeleteModal
        categories={categories}
        isDeleting={isDeleting}
        refetchCategories={fetchCategories}
        selectedCategory={selectedCategory}
        setIsDeleting={setIsDeleting}
      />
    </div>
  );
};

export default Categories;
