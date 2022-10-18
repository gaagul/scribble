import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, PageLoader, Button } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ARTICLE_FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ article, isEdit }) => {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [articleStatus, setArticleStatus] = useState("draft");
  const history = useHistory();

  const [categories, setCategories] = useState([]);
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

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await articlesApi.update(article.slug, {
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: articleStatus,
          author: "Oliver Smith",
        });
      } else {
        await articlesApi.create({
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: articleStatus,
          author: "Oliver Smith",
        });
      }
      history.push("/");
    } catch (err) {
      logger.error(err);
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="justify-center">
      <Formik
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={ARTICLE_FORM_VALIDATION_SCHEMA}
        initialValues={{
          body: article.body,
          category: article.category.id,
          title: article.title,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm className="mx-auto mt-5 max-w-xl">
            <div className="grid grid-cols-2 space-x-5">
              <Input required label="Article Title" name="title" />
              <Select
                isSearchable
                required
                label="Category"
                name="category"
                placeholder="Select a Category"
                options={categories.map(category => ({
                  value: category.id,
                  label: category.title,
                }))}
              />
            </div>
            <Textarea
              required
              className=""
              label="Article Body"
              name="body"
              rows="20"
            />
            <div className="m-2 flex">
              <div className="flex space-x-5">
                <div className="flex space-x-1">
                  <Button
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    size="medium"
                    style="primary"
                    type="submit"
                    label={
                      articleStatus === "draft"
                        ? "Save Draft"
                        : "Publish Article"
                    }
                    onClick={() => setSubmitted(true)}
                  />
                  <Dropdown position="bottom-end">
                    <li onClick={() => setArticleStatus("draft")}>Draft</li>
                    <li onClick={() => setArticleStatus("published")}>
                      Publish
                    </li>
                  </Dropdown>
                </div>
                <Button label="Cancel" style="text" to="/" />
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
export default Form;
