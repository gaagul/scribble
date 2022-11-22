import React, { useState } from "react";

import { Check, Close, MenuVertical } from "neetoicons";
import { Typography, Button, Input, Dropdown } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({
  categories,
  fetchCategories,
  setIsDeleting,
  setLoading,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");

  const { Menu, MenuItem } = Dropdown;

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
      setLoading(true);
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
      position: result.destination.index,
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
            {categories.map(category => (
              <Draggable
                draggableId={String(category.id)}
                index={category.position}
                key={category.id}
              >
                {provided => (
                  <li
                    key={category.id}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={
                      category.id === selectedCategory.id
                        ? "bg-gray-500"
                        : undefined
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryId !== category.id && (
                      <div className="border-t flex items-center justify-between space-x-2 p-3">
                        <div className="flex items-center space-x-2">
                          <i className="ri-drag-move-2-fill" />
                          <Typography size="body2" weight="medium">
                            {category.title}
                          </Typography>
                        </div>
                        <Dropdown
                          buttonStyle="secondary"
                          icon={() => <MenuVertical size={16} />}
                        >
                          <Menu>
                            <MenuItem.Button
                              onClick={() => {
                                setCategoryId(category.id);
                                setCategoryTitle(category.title);
                              }}
                            >
                              Edit
                            </MenuItem.Button>
                            <MenuItem.Button
                              style="danger"
                              onClick={() => {
                                setSelectedCategory(category);
                                setIsDeleting(true);
                              }}
                            >
                              Delete
                            </MenuItem.Button>
                          </Menu>
                        </Dropdown>
                      </div>
                    )}
                    {categoryId === category.id && (
                      <div className="border-t flex p-3">
                        <Input
                          autoFocus
                          value={categoryTitle}
                          onChange={e => setCategoryTitle(e.target.value)}
                          onKeyDown={e => handleKeyPress(e, category.title)}
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
