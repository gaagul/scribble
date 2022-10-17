import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button, PageLoader } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import organizationsApi from "apis/organizations";

const General = () => {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrg = async () => {
    try {
      const {
        data: { organization },
      } = await organizationsApi.get();
      setOrganization(organization);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      if (values.isPasswordProtected) {
        await organizationsApi.update(organization.id, {
          title: values.title,
          is_password_enabled: values.isPasswordProtected,
          password: values.password,
        });
      } else {
        await organizationsApi.update(organization.id, {
          title: values.title,
          is_password_enabled: false,
        });
        fetchOrg();
      }
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 space-y-5">
      <Typography style="h2">General Settings</Typography>
      <Typography style="body2">
        Configure general attributes of Scribble.
      </Typography>
      <Formik
        initialValues={{
          title: organization.title,
          isPasswordProtected: organization.is_password_enabled,
          password: organization.password,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, resetForm }) => (
          <FormikForm className="max-w-sm">
            <Input required label="Site Name" name="title" />
            <Checkbox
              className="mt-3"
              label="Password Protect Knowledge Base"
              name="isPasswordProtected"
            />
            <hr className="mt-4" />
            {values.isPasswordProtected && (
              <Input className="mt-4" label="Password" name="password" />
            )}
            <div className="mt-3 max-w-xs space-x-1">
              <Button label="Save Changes" style="primary" type="submit" />
              {values.isPasswordProtected && (
                <Button
                  label="Cancel"
                  style="text"
                  onClick={() => {
                    resetForm();
                  }}
                />
              )}
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
export default General;
