const CracoAlias = require("craco-alias");

module.exports = {
  babel: {
    presets: ["@emotion/babel-preset-css-prop"],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  resolve: {
    fallback: {
      querystring: require.resolve("querystring"),
      util: require.resolve("util/"),
      url: require.resolve("url/"),
    },
  },
  devServer: {
    client: {
      overlay: false,
    },
  },
};
