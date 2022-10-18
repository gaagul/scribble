import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Input, Button } from "neetoui";

const Add = ({ createCategory, setIsAdding }) => {
  const [category, setCategory] = useState("");

  return (
    <div className="mt -10 flex max-w-xs">
      <Input
        required
        className="mt-4"
        placeholder="Enter Category Name"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <div className="mt-4 ml-4 flex space-x-2">
        <Button icon={Check} onClick={() => createCategory(category)} />
        <Button icon={Close} onClick={() => setIsAdding(false)} />
      </div>
    </div>
  );
};

export default Add;
