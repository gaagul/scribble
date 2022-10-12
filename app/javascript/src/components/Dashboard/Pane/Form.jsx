import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Textarea, ActionDropdown, Button } from "neetoui";
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
        await articlesApi.create({
          title: values.title,
          body: values.body,
          category_id: values.category.value,
          status: articleStatus,
          user: "Oliver Smith",
        });
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
          <div className="m-4 flex">
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
          <Textarea label="Article Body" name="body" rows="20" />
          <div className="m-2 flex">
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
            <Button label="Cancel" style="text" to="/" />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};
export default Form;
