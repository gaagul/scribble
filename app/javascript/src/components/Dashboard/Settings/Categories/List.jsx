import React from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

const List = ({
  categories,
  fetchCategories,
  setIsDeleting,
  setLoading,
  selectedCategory,
  setSelectedCategory,
  setIsPaneOpen,
  setCategoryToEdit,
}) => {
  const { Menu, MenuItem } = Dropdown;

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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="categories">
        {provided => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {categories?.map(category => (
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
                              setCategoryToEdit(category);
                              setIsPaneOpen(true);
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
                    <Typography className="ml-8 pb-2" style="body3">
                      {category.count} Articles
                    </Typography>
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
