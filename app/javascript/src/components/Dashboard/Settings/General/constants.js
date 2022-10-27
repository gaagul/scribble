import * as Yup from "yup";

export const ORGANIZATION_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().required("Site is required"),
  password: Yup.string()
    .matches(
      /^(.*)(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)(.*)$/,
      "Password should contain atleast one character and one number"
    )
    .min(6, "Password should have atleast 6 characters"),
});
