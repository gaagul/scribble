import React, { useEffect, useState } from "react";

import { MenuBar } from "neetoui/layouts";
import queryString from "query-string";

import { SETTINGS_NAVLINKS } from "./constants";
import { getActiveNavLink } from "./utils";

const Settings = ({ history, location }) => {
  const { tab } = queryString.parse(location.search);

  const [activeNavlink, setActiveNavlink] = useState(
    () => getActiveNavLink(tab) || SETTINGS_NAVLINKS[0]
  );

  useEffect(() => history.push(activeNavlink?.path), [activeNavlink, history]);

  if (location.state?.resetTab) {
    location.state.resetTab = null;
    setActiveNavlink(() => getActiveNavLink(tab));
  }

  return (
    <div className="flex">
      <MenuBar showMenu title="Settings">
        {SETTINGS_NAVLINKS.map(navlink => (
          <div className="flex items-center" key={navlink.key}>
            <navlink.icon className="mb-2" size={30} />
            <MenuBar.Item
              active={tab === navlink.key}
              description={navlink.description}
              key={navlink.key}
              label={navlink.label}
              onClick={() => setActiveNavlink(navlink)}
            />
          </div>
        ))}
      </MenuBar>
      <activeNavlink.component />
    </div>
  );
};

export default Settings;
