import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import { CREATE_FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Create = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Form
      article={CREATE_FORM_INITIAL_VALUES}
      categories={categories}
      isEdit={false}
    />
  );
};
export default Create;
