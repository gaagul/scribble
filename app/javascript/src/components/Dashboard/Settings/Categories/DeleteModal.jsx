import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Typography, Button, Select, Callout } from "neetoui";

import categoriesApi from "apis/categories";

import { buildNewCategoryOptions } from "./utils";

const DeleteModal = ({
  categories,
  isDeleting,
  selectedCategory,
  setIsDeleting,
  refetchCategories,
}) => {
  const [newCategoryId, setNewCategoryId] = useState(0);
  const numberOfCategories = categories.length;

  const handleDelete = async () => {
    try {
      setIsDeleting(false);
      numberOfCategories > 1 && newCategoryId !== 0
        ? await categoriesApi.destroy({
            id: selectedCategory.id,
            new_category_id: newCategoryId,
          })
        : await categoriesApi.destroy({
            id: selectedCategory.id,
          });

      refetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal
      isOpen={isDeleting}
      onClose={() => {
        setIsDeleting(false);
      }}
    >
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          You are permanently deleting the
          <strong>{selectedCategory.title}</strong> category. This action cannot
          be undone. Do you wish to continue ?
        </Typography>
        {numberOfCategories > 1 ? (
          <>
            <Callout icon={Warning} style="danger">
              <Typography className="pr-2 text-justify" style="body2">
                Category <strong>{selectedCategory.title}</strong> has{" "}
                {selectedCategory.count}{" "}
                {selectedCategory.count === 1 ? "article" : "articles"}. Before
                this category can be deleted, these articles needs to be moved
                to another category.
              </Typography>
            </Callout>
            <Select
              required
              label="Select a category to move the corresponding article(s) into"
              options={buildNewCategoryOptions(categories, selectedCategory)}
              placeholder="Select new Category"
              strategy="fixed"
              onChange={e => setNewCategoryId(e.value)}
            />
          </>
        ) : (
          <Callout icon={Warning} style="danger">
            <Typography className="pr-2 text-justify" style="body2">
              Category <strong>{selectedCategory.title}</strong> has{" "}
              {selectedCategory.count}{" "}
              {selectedCategory.count === 1 ? "article" : "articles"}. All the
              articles will be moved to <strong>General</strong> category.
            </Typography>
          </Callout>
        )}
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          label="Continue"
          onClick={() => {
            handleDelete();
          }}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setIsDeleting(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;