import React from "react";

const InvalidRoute = () => (
  <div className="h-full w-screen">
    <h1 className="mx-auto mb-6">This page could not be found.</h1>
    <a className="text-blue-600" href="/articles">
      Back to home
    </a>
  </div>
);

export default InvalidRoute;
