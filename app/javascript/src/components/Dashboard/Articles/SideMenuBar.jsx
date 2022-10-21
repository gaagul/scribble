import React, { useState } from "react";

import { Plus, Search, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { searchWithTitle } from "./utils";

const SideMenuBar = ({
  categories,
  count,
  activeStatus,
  setActiveStatus,
  activeCategoryId,
  setActiveCategoryId,
  createCategory,
  newCategoryTitle,
  setNewCategoryTitle,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(true);
  const [searchCategory, setSearchCategory] = useState("");

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
        active={activeStatus === "draft"}
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
          setActiveStatus("published");
        }}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Plus,
            onClick: () =>
              setIsInputCollapsed(isInputCollapsed => !isInputCollapsed),
          },
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
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
        collapse={isSearchCollapsed}
        value={searchCategory}
        onChange={e => {
          setSearchCategory(e.target.value);
        }}
        onCollapse={() => {
          setSearchCategory("");
          setActiveCategoryId(0);
          setIsSearchCollapsed(true);
        }}
      />
      {!isInputCollapsed && (
        <div className="mb-4 flex">
          <Input
            placeholder="Add New Category"
            type="search"
            value={newCategoryTitle}
            onChange={e => setNewCategoryTitle(e.target.value)}
          />
          <Button
            icon={Check}
            size="large"
            style="text"
            onClick={() => {
              createCategory();
              setIsInputCollapsed(true);
            }}
          />
          <Button
            icon={Close}
            size="large"
            style="text"
            onClick={() => {
              setIsInputCollapsed(true);
              setNewCategoryTitle("");
            }}
          />
        </div>
      )}
      {searchWithTitle(categories, searchCategory).map(category => (
        <MenuBar.Block
          active={category.id === activeCategoryId}
          count={category.count}
          key={category.id}
          label={category.title}
          onClick={() => {
            if (activeCategoryId === category.id) {
              setActiveCategoryId(0);
            } else {
              setActiveCategoryId(category.id);
            }
          }}
        />
      ))}
    </MenuBar>
  );
};
export default SideMenuBar;
