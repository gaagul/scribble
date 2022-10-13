import React from "react";

import { CREATE_FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Create = () => (
  <Form article={CREATE_FORM_INITIAL_VALUES} isEdit={false} />
);
export default Create;
