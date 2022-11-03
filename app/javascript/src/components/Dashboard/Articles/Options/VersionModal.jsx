import React from "react";

import { Modal, Input, Typography, Textarea, Button } from "neetoui";

import versionsApi from "apis/versions";

const VersionModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedVersion,
  fetchData,
}) => {
  const handleClose = () => setIsModalOpen(false);
  const handleRestore = async () => {
    try {
      await versionsApi.articleUpdate({
        id: selectedVersion.id,
        payload: {
          title: selectedVersion.title,
          body: selectedVersion.body,
          category_id: selectedVersion.category.id,
          status: selectedVersion.status,
        },
      });
      setIsModalOpen(false);
    } catch (error) {
      logger.error(error);
    } finally {
      fetchData();
    }
  };

  return (
    <Modal
      className="p-4"
      isOpen={isModalOpen}
      size="large"
      onClose={handleClose}
    >
      <Modal.Header>
        <Typography style="h2">Version History</Typography>
      </Modal.Header>
      <Modal.Body className="h-full w-full">
        <div className="mb-4 flex space-x-2">
          <Input
            disabled
            className="w-3/6"
            label="Article Title"
            value={selectedVersion.title}
          />
          <Input
            disabled
            className="w-2/6"
            label="Category"
            value={selectedVersion.category?.title}
          />
        </div>
        <Textarea
          disabled
          label="Article Content"
          value={selectedVersion.body}
        />
        <Button
          className="mt-4"
          label="Restore Version"
          onClick={handleRestore}
        />
        <Button className="ml-3" label="Cancel" style="secondary" />
      </Modal.Body>
    </Modal>
  );
};

export default VersionModal;