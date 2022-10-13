import React, { useState } from "react";

import { Plus, Search, Check, Close } from "neetoicons";
import { Typography, Button, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

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
          setActiveStatus("draft");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "published"}
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
        onCollapse={() => setIsSearchCollapsed(true)}
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
            }}
          />
        </div>
      )}
      {categories.map(category => (
        <MenuBar.Block
          active={category.id === activeCategoryId}
          count={category.count}
          key={category.id}
          label={category.title}
          onClick={() => {
            setActiveCategoryId(category.id);
          }}
        />
      ))}
    </MenuBar>
  );
};
export default SideMenuBar;
