import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button, PageLoader } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import organizationsApi from "apis/organizations";

const General = () => {
  const [organization, setOrganization] = useState({});
  const [editPassword, setEditPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrg = async () => {
    try {
      setLoading(true);
      const {
        data: { organization },
      } = await organizationsApi.get();
      setOrganization(organization);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      if (editPassword) {
        await organizationsApi.update(organization.id, {
          title: values.title,
          is_password_enabled: values.isPasswordProtected,
          password: values.password,
        });
        fetchOrg();
      } else {
        await organizationsApi.update(organization.id, {
          title: values.title,
          is_password_enabled: values.isPasswordProtected,
        });
        fetchOrg();
      }
    } catch (err) {
      logger.error(err);
    } finally {
      onSubmitProps.setSubmitting(false);
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
        enableReinitialize
        initialValues={{
          title: organization.title,
          isPasswordProtected: organization.is_password_enabled,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, resetForm, dirty, isValid, isSubmitting }) => (
          <FormikForm className="max-w-sm">
            <Input required label="Site Name" name="title" />
            <Typography style="nano">
              Customize the site name which is used to show the site name in
              Open Graph Tags.
            </Typography>
            <hr className="mt-4" />
            <Checkbox
              className="mt-3"
              label="Password Protect Knowledge Base"
              name="isPasswordProtected"
            />
            {values.isPasswordProtected && (
              <div className="mt-4 flex items-center space-x-3">
                <Input
                  disabled={!editPassword}
                  label="Password"
                  name="password"
                  placeholder="*******"
                  type="password"
                />
                <Button
                  className="mt-5"
                  label={editPassword ? "Cancel" : "Change Password"}
                  size="small"
                  style="link"
                  onClick={() => setEditPassword(editPassword => !editPassword)}
                />
              </div>
            )}
            {dirty && isValid && (
              <div className="mt-3 max-w-xs space-x-1">
                <Button
                  disabled={!dirty || isSubmitting}
                  label="Save Changes"
                  style="primary"
                  type="submit"
                />
                <Button
                  label="Reset"
                  style="text"
                  onClick={() => {
                    resetForm();
                  }}
                />
              </div>
            )}
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};
export default General;
