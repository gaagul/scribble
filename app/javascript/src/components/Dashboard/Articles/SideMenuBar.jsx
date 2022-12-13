import React, { useState } from "react";

import { Plus, Search, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";

import { filterCategories } from "./utils";

const SideMenuBar = ({
  categories,
  count,
  activeStatus,
  setActiveStatus,
  fetchCategories,
  activeCategoryIds,
  setActiveCategoryIds,
  setCurrentPage,
  categorySearchTerm,
  setCategorySearchTerm,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const createCategory = async () => {
    try {
      await categoriesApi.create({ title: newCategoryTitle });
      fetchCategories();
    } catch (error) {
      logger.error(error);
    } finally {
      setNewCategoryTitle("");
    }
  };

  const handleSubmit = () => {
    createCategory();
    setIsInputCollapsed(true);
  };

  const handleClose = () => {
    setIsInputCollapsed(true);
    setNewCategoryTitle("");
  };

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block
        active={activeStatus === "all"}
        count={count.allCount}
        label="All"
        onClick={() => {
          setActiveStatus("all");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "Draft"}
        count={count.draftCount}
        label="Draft"
        onClick={() => {
          setActiveStatus("Draft");
          setCurrentPage(1);
        }}
      />
      <MenuBar.Block
        active={activeStatus === "Published"}
        count={count.publishedCount}
        label="Published"
        onClick={() => {
          setActiveStatus("Published");
          setCurrentPage(1);
        }}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Plus,
            onClick: () => {
              setIsInputCollapsed(isInputCollapsed => !isInputCollapsed);
              setIsSearchCollapsed(true);
            },
          },
          {
            icon: Search,
            onClick: () => {
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed);
              setIsInputCollapsed(true);
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        autoFocus
        collapse={isSearchCollapsed}
        placeholder="Search Category"
        value={categorySearchTerm}
        onChange={e => {
          setCategorySearchTerm(e.target.value);
        }}
        onCollapse={() => {
          setCategorySearchTerm("");
          setActiveCategoryIds(activeCategoryIds);
          setIsSearchCollapsed(true);
        }}
      />
      {!isInputCollapsed && (
        <div className="mb-4 flex">
          <Input
            autoFocus
            placeholder="Add New Category"
            value={newCategoryTitle}
            onChange={e => setNewCategoryTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              } else if (e.key === "Escape") {
                handleClose();
              }
            }}
          />
          <Button
            disabled={newCategoryTitle === ""}
            icon={Check}
            size="large"
            style="text"
            onClick={handleSubmit}
          />
          <Button
            icon={Close}
            size="large"
            style="text"
            onClick={handleClose}
          />
        </div>
      )}
      {categories?.map(category => (
        <MenuBar.Block
          active={activeCategoryIds.includes(category.id)}
          count={category.count}
          key={category.id}
          label={category.title}
          onClick={() => {
            const filteredCategories = filterCategories(
              activeCategoryIds,
              category.id
            );
            setActiveCategoryIds(filteredCategories);
            setCurrentPage(1);
            setCategorySearchTerm("");
            setIsSearchCollapsed(true);
          }}
        />
      ))}
    </MenuBar>
  );
};
export default SideMenuBar;
