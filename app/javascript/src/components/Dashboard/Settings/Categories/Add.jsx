import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Input, Button, Pane, Typography } from "neetoui";

const Add = ({ createCategory, setIsAdding, isAdding }) => {
  const [category, setCategory] = useState("");

  const handleSubmit = () => createCategory(category);

  const handleClose = () => {
    setCategory("");
    setIsAdding(false);
  };

  const keyPress = e => {
    if (e.key === "Enter" || (e.key === "Enter" && e.shiftKey === true)) {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div onKeyDown={e => keyPress(e)}>
      <Pane isOpen={isAdding} onClose={handleClose}>
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
            disabled={category === ""}
            icon={Check}
            label="Save"
            size="large"
            style="primary"
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
