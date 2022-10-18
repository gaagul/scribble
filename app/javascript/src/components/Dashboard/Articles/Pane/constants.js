import * as Yup from "yup";

export const CREATE_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  category: { label: null, value: null },
};

export const ARTICLE_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().max(30).required("Title is required"),
  category: Yup.object().required("Please select a category"),
  body: Yup.string().required("Body of the article cannot be empty"),
});
