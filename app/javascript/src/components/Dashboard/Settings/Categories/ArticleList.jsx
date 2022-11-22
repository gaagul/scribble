import React, { useState, useEffect } from "react";

import { Clock } from "neetoicons";
import {
  PageLoader,
  Typography,
  Checkbox,
  Tag,
  Tooltip,
  Dropdown,
} from "neetoui";
import { Header } from "neetoui/layouts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/articles";

import {
  formatWithFromNow,
  formatWithDayAndDate,
  filterArticles,
} from "./utils";

const ArticleList = ({ selectedCategory, categories, fetchCategories }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);

  const { Menu, MenuItem } = Dropdown;

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list({ activeCategoryIds: [selectedCategory?.id] });
      setArticles(articles);
      setSelectedArticleIds([]);
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
      await fetchCategories();
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
      await fetchArticles();
      await fetchCategories();
      setLoading(false);
    } catch (error) {
      logger.error(error);
    }
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
          <Dropdown disabled={selectedArticleIds.length === 0} label="Move to">
            <Menu>
              {categories.map(
                category =>
                  category.id !== selectedCategory.id && (
                    <MenuItem.Button
                      key={category.id}
                      onClick={() => {
                        handleCategoryChange(category.id);
                      }}
                    >
                      {category.title}
                    </MenuItem.Button>
                  )
              )}
            </Menu>
          </Dropdown>
        }
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="articles">
          {provided => (
            <ul
              {...provided.droppableProps}
              className="p-2"
              ref={provided.innerRef}
            >
              {articles.map(({ id, title, body, position, status, date }) => (
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
                        <div className="flex flex-col">
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
                                date
                              )}(${formatWithFromNow(date)})`}
                            >
                              <Typography style="body3">
                                {formatWithFromNow(date)}
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
    </div>
  );
};

export default ArticleList;
