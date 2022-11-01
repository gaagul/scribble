import React, { useState, useEffect } from "react";

import { Check, Close, Reorder, Delete, Edit } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({
  categories,
  fetchCategories,
  setCategoryToDelete,
  setIsDeleting,
}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = async () => {
    try {
      await categoriesApi.update({
        id: categoryId,
        payload: {
          title: categoryTitle,
        },
      });
      setCategoryId(0);
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const updatePosition = async ({ id, position }) => {
    try {
      await categoriesApi.update({
        id,
        payload: {
          position,
        },
        quiet: true,
      });
      await fetchCategories();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    updatePosition({
      id: result.draggableId,
      position: result.destination.index + 1,
    });
  };

  const handleKeyPress = (e, title) => {
    if (e.key === "Enter" && title !== categoryTitle) {
      updateCategory();
    } else if (e.key === "Escape") {
      setCategoryId(0);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map(({ id, title, count }, position) => (
              <Draggable draggableId={String(id)} index={position} key={id}>
                {provided => (
                  <li
                    key={id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {categoryId !== id && (
                      <div className="border-t flex items-center justify-between space-x-2 p-3">
                        <div className="flex items-center space-x-2">
                          <Reorder />
                          <Typography size="body2" weight="medium">
                            {title}
                          </Typography>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            icon={Delete}
                            style="text"
                            onClick={() => {
                              setCategoryToDelete({
                                id,
                                title,
                                count,
                              });
                              setIsDeleting(true);
                            }}
                          />
                          <Button
                            icon={Edit}
                            style="text"
                            onClick={() => {
                              setCategoryId(id);
                              setCategoryTitle(title);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {categoryId === id && (
                      <div className="border-t flex p-3">
                        <Input
                          autoFocus
                          value={categoryTitle}
                          onChange={e => setCategoryTitle(e.target.value)}
                          onKeyDown={e => handleKeyPress(e, title)}
                        />
                        <Button
                          icon={Check}
                          style="secondary"
                          onClick={() => updateCategory()}
                        />
                        <Button
                          icon={Close}
                          style="secondary"
                          onClick={() => {
                            setCategoryId(0);
                          }}
                        />
                      </div>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
