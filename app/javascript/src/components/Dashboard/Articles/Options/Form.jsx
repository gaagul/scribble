import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Formik, Form as FormikForm } from "formik";
import { PageLoader, Button } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ARTICLE_FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ article, isEdit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);

  const history = useHistory();

  const { isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.list(),
    onSuccess: ({ data: { categories } }) => {
      setCategories(categories);
    },
    onError: error => {
      logger.error(error);
    },
  });

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await articlesApi.update({
          id: article.id,
          payload: {
            title: values.title,
            body: values.body,
            category_id: values.category.value,
            status: values.status.value,
          },
        });
      } else {
        await articlesApi.create({
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: values.status.value,
        });
      }
      history.push("/");
    } catch (err) {
      logger.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mt-10 w-full">
      <Formik
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={ARTICLE_FORM_VALIDATION_SCHEMA}
        initialValues={{
          title: article.title,
          body: article.body,
          category: {
            value: article.category.id,
            label: article.category.title,
          },
          status: {
            value: article.status,
            label: article.status === "Published" ? "Publish" : "Draft",
          },
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <FormikForm className="mx-auto mt-5 max-h-full max-w-2xl">
            <div className="grid grid-cols-2 space-x-5">
              <Input
                required
                label="Article Title"
                name="title"
                placeholder="Enter Article Title"
              />
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
              className="mt-4"
              label="Article Body"
              name="body"
              placeholder="Enter Article Body"
              rows="20"
            />
            <div className="m-2 flex">
              <div className="flex space-x-5">
                <div className="flex space-x-1">
                  <Button
                    disabled={isSubmitting || !dirty}
                    label="Save Changes"
                    loading={isSubmitting}
                    size="medium"
                    style="primary"
                    type="submit"
                    onClick={() => setSubmitted(true)}
                  />
                  <Select
                    required
                    name="status"
                    options={[
                      { label: "Draft", value: "Draft" },
                      { label: "Publish", value: "Published" },
                    ]}
                  />
                </div>
                <Button label="Cancel" style="secondary" to="/" />
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
export default Form;
