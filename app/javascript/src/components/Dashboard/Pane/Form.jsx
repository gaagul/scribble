import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Textarea, ActionDropdown } from "neetoui";
import { Input, Select } from "neetoui/formik";

import articlesApi from "apis/articles";

const Form = ({ article, isEdit, categories }) => {
  const [submitted, setSubmitted] = useState(false);
  const [articleStatus, setArticleStatus] = useState("draft");
  const { Menu, MenuItem } = ActionDropdown;

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await articlesApi.update(article.slug, {
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: articleStatus,
          user: "Oliver Smith",
        });
      } else {
        await articlesApi.acreate(values);
      }
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      // validationSchema={}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className="w-fill">
          <div className="flex">
            <Input required label="Article Title" name="title" />
            <Select
              isSearchable
              required
              label="Category"
              name="categoryId"
              placeholder="Select a Category"
              options={categories.map(category => ({
                value: category.id,
                label: category.title,
              }))}
            />
          </div>
          <Textarea label="Article Body" name="body" rows="20" />
          <ActionDropdown
            disabled={isSubmitting}
            label="Save Draft"
            loading={isSubmitting}
            type="submit"
            onClick={() => setSubmitted(true)}
          >
            <Menu>
              <MenuItem.Button
                type="submit"
                onClick={() => {
                  setArticleStatus("published");
                  setSubmitted(true);
                }}
              >
                Publish
              </MenuItem.Button>
            </Menu>
          </ActionDropdown>
        </FormikForm>
      )}
    </Formik>
  );
};
export default Form;
