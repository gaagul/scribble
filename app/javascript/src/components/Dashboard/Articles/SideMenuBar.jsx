import React, { useState } from "react";

import { Plus, Search, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { searchWithTitle, filterCategories } from "./utils";

const SideMenuBar = ({
  categories,
  count,
  activeStatus,
  setActiveStatus,
  activeCategoryIds,
  setActiveCategoryIds,
  createCategory,
  newCategoryTitle,
  setNewCategoryTitle,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");
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
        }}
      />
      <MenuBar.Block
        active={activeStatus === "Published"}
        count={count.publishedCount}
        label="Published"
        onClick={() => {
          setActiveStatus("Published");
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
        value={searchCategory}
        onChange={e => {
          setSearchCategory(e.target.value);
        }}
        onCollapse={() => {
          setSearchCategory("");
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
      {searchWithTitle(categories, searchCategory).map(category => (
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
          }}
        />
      ))}
    </MenuBar>
  );
};
export default SideMenuBar;
