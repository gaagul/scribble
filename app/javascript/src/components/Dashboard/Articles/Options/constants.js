import * as Yup from "yup";

export const CREATE_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  category: { label: null, value: null },
  status: "Draft",
};

export const ARTICLE_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .max(50)
    .matches(/[a-zA-Z]/, "Title is Invalid")
    .required("Title is required"),
  category: Yup.object().nullable().required("Select a Category"),
  body: Yup.string().required("Body of the article cannot be empty"),
});
