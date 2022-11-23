import React, { useState, useEffect, useRef } from "react";

import { Search, Close } from "neetoicons";
import { Modal, Input, Button, Typography, Callout } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

import euiApi from "apis/eui";
import useRoveFocus from "hooks/useRoveFocus";

import ArticleCard from "./ArticleCard";

const SearchModal = ({ showModal, setShowModal, history }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [articles, setArticles] = useState([]);

  const [focus, setFocus] = useRoveFocus(articles.length);

  const searchRef = useRef(null);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await euiApi.listArticles(searchTitle);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSearchTitle("");
  };

  const handleKeyDown = e => {
    setFocus(0);
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    fetchArticles();
  }, [searchTitle, showModal]);

  return (
    <Modal
      className="max-h-1/2 min-h-1/2 overflow-scroll"
      closeButton={false}
      isOpen={showModal}
      size="large"
      onClose={handleClose}
    >
      <div className="sticky top-0 z-50 flex w-full justify-between bg-white py-4 px-4">
        <Input
          autoFocus
          autoComplete="off"
          className="m-auto w-full"
          placeholder="Search for articles here"
          prefix={<Search />}
          ref={searchRef}
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <p className="ml-4 mt-1 mr-1">(Esc)</p>
        <Button className="mr-4" icon={Close} onClick={handleClose} />
      </div>
      <Callout className="ml-6">(cmd + / to focus Input)</Callout>
      <div className="overflow-scroll">
        <ul className="border-gray-1 my-2 w-full">
          {!either(isNil, isEmpty)(articles) ? (
            articles.map((article, index) => (
              <ArticleCard
                article={article}
                focus={focus}
                handleClose={handleClose}
                history={history}
                index={index + 1}
                key={article.id}
                searchRef={searchRef}
                setFocus={setFocus}
              />
            ))
          ) : (
            <Typography>No articles </Typography>
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default SearchModal;
