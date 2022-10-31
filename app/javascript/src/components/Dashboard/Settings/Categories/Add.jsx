import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Input, Button } from "neetoui";

const Add = ({ createCategory, setIsAdding }) => {
  const [category, setCategory] = useState("");
  const handleSubmit = () => {
    createCategory(category);
  };

  const handleClose = () => setIsAdding(false);

  const keyPress = e => {
    if (e.key === "Enter" || (e.key === "Enter" && e.shiftKey === true)) {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <div className="mt -10 flex max-w-xs" onKeyDown={e => keyPress(e)}>
      <Input
        required
        className="mt-4"
        placeholder="Enter Category Name"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <div className="mt-4 ml-4 flex space-x-2">
        <Button
          disabled={category === ""}
          icon={Check}
          onClick={handleSubmit}
        />
        <Button icon={Close} onClick={handleClose} />
      </div>
    </div>
  );
};

export default Add;
