import React from "react";

import { Modal, Input, Typography, Textarea, Button } from "neetoui";

const VersionModal = ({ isModalOpen, setIsModalOpen, selectedVersion }) => {
  const handleClose = () => setIsModalOpen(false);

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
        <Button className="mt-4" label="Restore Version" />
        <Button className="ml-3" label="Cancel" style="secondary" />
      </Modal.Body>
    </Modal>
  );
};

export default VersionModal;
