import React, { useState, useEffect } from "react";

import { Search, RightArrow, Close } from "neetoicons";
import { Modal, Input, Button } from "neetoui";
import { isNil, isEmpty, either } from "ramda";

import euiApi from "apis/eui";

const SearchModal = ({ showModal, setShowModal, history }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [articles, setArticles] = useState([]);

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
      onClose={handleClose}
    >
      <div className="sticky top-0 z-50 flex w-full justify-between bg-white py-4 px-4">
        <Input
          autoFocus
          className="m-auto w-full"
          placeholder="Search for articles here"
          prefix={<Search />}
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <p className="ml-4 mt-1 mr-1">(Esc)</p>
        <Button className="mr-4" icon={Close} onClick={handleClose} />
      </div>
      <div className="overflow-scroll">
        <ul className="border-gray-1 my-2 w-full">
          {!either(isNil, isEmpty)(articles) &&
            articles.map(article => (
              <a href={`/public/${article.slug}`} key={article.id}>
                <li
                  className="relative m-2 flex rounded-xl border-2 border-solid border-gray-300 p-2 hover:bg-indigo-700 hover:text-white"
                  onClick={() => {
                    history.push(`/public/${article.slug}`);
                    handleClose();
                  }}
                >
                  <RightArrow className="mr-4" />
                  {article.title}
                </li>
              </a>
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default SearchModal;
