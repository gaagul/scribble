import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const SideMenuBar = ({
  categories,
  count,
  activeStatus,
  setActiveStatus,
  activeCategoryId,
  setActiveCategoryId,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block
        active={activeStatus === "all"}
        count={count.all_count}
        label="All"
        onClick={() => {
          setActiveStatus("all");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "draft"}
        count={count.draft_count}
        label="Draft"
        onClick={() => {
          setActiveStatus("draft");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "published"}
        count={count.published_count}
        label="Published"
        onClick={() => {
          setActiveStatus("published");
        }}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Plus,
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
