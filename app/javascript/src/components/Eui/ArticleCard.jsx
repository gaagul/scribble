import React, { useEffect, useRef } from "react";

import { RightArrow } from "neetoicons";

const ArticleCard = ({
  article,
  focus,
  index,
  setFocus,
  handleClose,
  searchRef,
  history,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (focus === 0) {
      searchRef.current.focus();
    } else if (focus === index) {
      ref.current.focus();
    }
  }, [focus]);

  const handleSelect = e => {
    if (e.key === "Enter") {
      history.push(`/public/${article.slug}`);
      handleClose();
    }

    setFocus(index);
  };

  return (
    <a href={`/public/${article.slug}`}>
      <li
        key={article.id}
        ref={ref}
        tabIndex={focus ? 0 : -1}
        className={`relative m-2 flex rounded-xl border-2 border-solid border-gray-300 p-2 hover:bg-indigo-400 hover:text-white ${
          focus === index && "bg-indigo-700 text-white"
        }`}
        onKeyDown={handleSelect}
        onClick={() => {
          history.push(`/public/${article.slug}`);
          handleClose();
        }}
      >
        <RightArrow className="mr-4" />
        {article.title}
      </li>
    </a>
  );
};

export default ArticleCard;
