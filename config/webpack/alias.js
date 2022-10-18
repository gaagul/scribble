const path = require("path");

module.exports = {
  resolve: {
    alias: {
      constants: "src/constants",
      apis: "src/apis",
      lib: "src/lib",
      common: "src/common",
      utils: "src/utils",
      components: "src/components",
      neetoui: "@bigbinary/neetoui",
      neetoicons: "@bigbinary/neeto-icons",
      images: path.resolve(__dirname, "../", "../", "app/assets/images"),
    },
  },
};
