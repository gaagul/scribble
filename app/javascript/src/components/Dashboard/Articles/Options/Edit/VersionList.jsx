import React from "react";

import { Typography, Tag, Callout, Button } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

const VersionList = ({
  article,
  versions,
  setIsModalOpen,
  setSelectedVersion,
}) => (
  <div className="max-h-screen w-4/12 overflow-scroll border-l-2 px-3">
    <div className="sticky top-0 z-10 bg-gray-100">
      <Typography className="mt-2" style="h3">
        Current Status:
        <Tag
          className="ml-3"
          label={article.status}
          size="large"
          style={article.status === "Published" ? "success" : "warning"}
        />
      </Typography>
      <Typography className="mt-6" style="h3">
        Version History
      </Typography>
      <Typography className="mt-1 mb-4" style="body2">
        Version history of {`${article.title}`}.
      </Typography>
      <Callout className="flex">
        <div className="flex flex-col">
          <Typography className="text-gray-500" style="body2">
            {article.time}
          </Typography>
          <Typography className="text-gray-500" style="body2">
            Current Version
          </Typography>
        </div>
        <Typography className="ml-auto" style="body2">{`Article ${
          article.status === "Draft" ? "Drafted" : "Published"
        }`}</Typography>
      </Callout>
    </div>
    <div className="max-h-screen flex-col overflow-scroll">
      {!either(isNil, isEmpty)(versions) ? (
        versions.map(version => (
          <div
            className="mt-2 flex justify-between rounded-md border-2 border-gray-300 bg-gray-100 p-3"
            key={version.version_id}
          >
            {version.event !== "update" &&
            version.event.split("-")[0] !== "restore" ? (
              <>
                <div className="flex-col">
                  <Typography className="text-gray-500" style="body2">
                    {version.time}
                  </Typography>
                  <Typography className="text-gray-500" style="body2">
                    {version.event}
                  </Typography>
                </div>
                <Typography
                  className="my-auto ml-auto text-indigo-300"
                  style="h5"
                >
                  Article Restored
                </Typography>
              </>
            ) : (
              <>
                <Typography className="text-gray-500" style="body2">
                  {version.time}
                </Typography>
                <Button
                  style="link"
                  label={`Article ${
                    version.status === "Draft" ? "Drafted" : "Published"
                  }`}
                  onClick={() => {
                    setSelectedVersion(version);
                    setIsModalOpen(true);
                  }}
                />
              </>
            )}
          </div>
        ))
      ) : (
        <Typography>No version History Found!</Typography>
      )}
    </div>
  </div>
);

export default VersionList;
