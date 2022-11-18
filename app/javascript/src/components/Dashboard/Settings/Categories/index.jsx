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
  const [categories, setCategories] = useState([]);
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
    <div className="w-full">
      <div className="w-1/3 space-y-4 px-4 pt-4">
        <div className="flex justify-between space-x-1">
          <Typography style="h2">Manage Categories</Typography>
          <Button icon={Plus} onClick={() => setIsAdding(true)} />
        </div>
        <Add
          createCategory={createCategory}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
        <List
          categories={categories}
          fetchCategories={fetchCategories}
          setCategoryToDelete={setSelectedCategory}
          setIsDeleting={setIsDeleting}
          setLoading={setLoading}
        />
        <DeleteModal
          categories={categories}
          isDeleting={isDeleting}
          refetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
          setIsDeleting={setIsDeleting}
        />
      </div>
    </div>
  );
};

export default Categories;
