import React, { useState, useEffect } from "react";

import { Clock } from "neetoicons";
import {
  PageLoader,
  Callout,
  Typography,
  Checkbox,
  Tag,
  Tooltip,
  Button,
  Select,
} from "neetoui";
import { Header } from "neetoui/layouts";
import { either, isEmpty, isNil } from "ramda";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";
import { getFromLocalStorage } from "utils/storage";

import {
  formatWithFromNow,
  formatWithDayAndDate,
  filterArticles,
} from "./utils";

const ArticleList = ({ selectedCategory, categories, refetchCategories }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [showMessage, setShowMessage] = useState(
    getFromLocalStorage("showMessage")
  );

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list({ activeCategoryIds: [selectedCategory?.id] });
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
  };

  const updatePosition = async ({ id, position }) => {
    try {
      setLoading(true);
      await articlesApi.update({
        id,
        payload: {
          position,
        },
        quiet: true,
      });
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    updatePosition({
      id: result.draggableId,
      position: result.destination.index,
    });
  };

  const handleCategoryChange = async newCategoryId => {
    try {
      setLoading(true);
      await articlesApi.bulkUpdate({
        selectedArticleIds,
        newCategoryId,
      });
      refetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDontShowMessage = () => {
    localStorage.setItem("showMessage", false);
    setShowMessage(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="w-screen-md h-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="max-h-screen w-8/12 overflow-scroll px-2">
      <Header
        className="sticky top-0 z-10"
        title="Layouts"
        actionBlock={
          <Tooltip
            content="Select atleast one article before you choose a new category"
            disabled={selectedArticleIds.length > 0}
            position="bottom"
          >
            <div>
              <Select
                isSearchable
                className="w-40"
                isDisabled={selectedArticleIds.length === 0}
                placeholder="Move to"
                size="small"
                options={categories
                  .filter(category => category.id !== selectedCategory.id)
                  .map(category => ({
                    label: category.title,
                    value: category.id,
                  }))}
                onChange={category => handleCategoryChange(category.value)}
              />
            </div>
          </Tooltip>
        }
      />
      {either(isNil, isEmpty)(showMessage) && (
        <Callout className="m-2">
          <Typography style="body3">
            You can reorder categories or articles by drag and drop here. You
            can also multiselect articles and move them together to any category
            you have created.{" "}
            <span
              className="cursor-pointer underline"
              onClick={handleDontShowMessage}
            >
              Don't show this info again
            </span>
          </Typography>
        </Callout>
      )}
      {!either(isNil, isEmpty)(articles) ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="articles">
            {provided => (
              <ul
                {...provided.droppableProps}
                className="p-2"
                ref={provided.innerRef}
              >
                {articles.map(({ id, title, body, position, status, time }) => (
                  <Draggable draggableId={String(id)} index={position} key={id}>
                    {provided => (
                      <li
                        className="mt-2 max-w-screen-md"
                        key={id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div className="border flex w-full items-center justify-between rounded-sm border-gray-200 bg-white px-4 py-2 shadow-sm">
                          <Checkbox
                            checked={selectedArticleIds.includes(id)}
                            onChange={() => {
                              setSelectedArticleIds(
                                filterArticles(selectedArticleIds, id)
                              );
                            }}
                          />
                          <div className="flex w-full flex-col space-y-2 px-4">
                            <Typography
                              className="text-sm font-medium text-gray-900"
                              style="h3"
                            >
                              {title}
                            </Typography>
                            <Typography
                              className="truncate max-w-screen-sm overflow-hidden"
                              style="body3"
                            >
                              {body}
                            </Typography>
                            <hr />
                            <div className="ml-auto mt-4 flex items-center">
                              <Clock />
                              <Tooltip
                                position="top"
                                content={`${formatWithDayAndDate(
                                  time
                                )}(${formatWithFromNow(time)})`}
                              >
                                <Typography style="body3">
                                  {formatWithFromNow(time)}
                                </Typography>
                              </Tooltip>
                              <Tag
                                className="ml-2"
                                label={status}
                                style={
                                  status === "Published" ? "success" : "warning"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center">
          <Typography>No Articles in the corresponding category</Typography>
          <Button
            className="mt-6 ml-12"
            disabled={either(isEmpty, isNil)(categories)}
            label="Add new article"
            to="/article/create"
          />
        </div>
      )}
    </div>
  );
};

export default ArticleList;
