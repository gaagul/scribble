import React, { useState, useEffect } from "react";

import { Check, Close } from "neetoicons";
import { Input, Button, Pane, Typography } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

const Add = ({
  createCategory,
  setIsPaneOpen,
  isPaneOpen,
  categoryToEdit,
  setCategoryToEdit,
  updateCategory,
}) => {
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = () => {
    if (isEditing) {
      updateCategory({ id: categoryToEdit.id, title: category });
    } else {
      createCategory(category);
    }
  };

  const handleClose = () => {
    setCategory("");
    setCategoryToEdit({});
    setIsPaneOpen(false);
  };

  const keyPress = e => {
    if (e.key === "Enter") {
      category !== "" && category !== categoryToEdit.title && handleSubmit();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (!either(isEmpty, isNil)(categoryToEdit)) {
      setCategory(categoryToEdit.title);
      setIsEditing(true);
    }
  }, [categoryToEdit]);

  return (
    <div onKeyDown={e => keyPress(e)}>
      <Pane isOpen={isPaneOpen} onClose={handleClose}>
        <Pane.Header>
          <Typography style="h1">Add Category</Typography>
        </Pane.Header>
        <Pane.Body>
          <Input
            autoFocus
            required
            className="w-full"
            placeholder="Enter Category Name"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </Pane.Body>
        <Pane.Footer className="flex space-x-2">
          <Button
            icon={Check}
            label="Save"
            size="large"
            style="primary"
            disabled={
              category === "" ||
              (isEditing && category === categoryToEdit.title)
            }
            onClick={handleSubmit}
          />
          <Button
            icon={Close}
            label="Cancel"
            size="large"
            style="text"
            onClick={handleClose}
          />
        </Pane.Footer>
      </Pane>
    </div>
  );
};

export default Add;
