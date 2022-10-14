import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Input, Typography, Checkbox, Button } from "neetoui";

const General = () => {
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  // if (loading) {
  //   return (
  //     <div className="h-screen w-screen">
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <div className="mx-auto mt-10 space-y-5">
      <Typography style="h2">General Settings</Typography>
      <Typography style="body2">
        Configure general attributes of Scribble.
      </Typography>
      <Formik>
        {() => (
          <FormikForm className="max-w-sm">
            <Input
              required
              helpText="Customize the site name which is used to show the site name in Open Graph Tags."
              label="Site Name"
              name="siteName"
            />
            <Checkbox
              checked={isPasswordProtected}
              className="mt-5"
              id="passwordCheckbox"
              label="Password Protect Knowledge Base"
              onChange={() => {
                setIsPasswordProtected(
                  isPasswordProtected => !isPasswordProtected
                );
              }}
            />
            <hr className="mt-4" />
            {isPasswordProtected && (
              <Input
                className="mt-4"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            )}
            <div className="mt-3 max-w-xs space-x-1">
              <Button label="Save Changes" style="primary" type="submit" />
              {isPasswordProtected && (
                <Button
                  label="Cancel"
                  style="text"
                  onClick={() => setIsPasswordProtected(false)}
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
