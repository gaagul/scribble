import "../stylesheets/application.scss";

require("@rails/ujs").start();
require("@rails/activestorage").start();
require("channels");

const componentRequireContext = require.context("src", true);
const ReactRailsUJS = require("react_ujs");

ReactRailsUJS.useContext(componentRequireContext);
