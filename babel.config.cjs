const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, IE 11, not dead",
      useBuiltIns: "entry",
      corejs: "^3",
      modules: "auto", // ensures import/export are transpiled for Webpack
    },
  ],
];

module.exports = { presets };
