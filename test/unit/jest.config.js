const path = require("path");

module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: ["js", "json", "vue"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1"
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/test/e2e"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(js)$",
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["<rootDir>/test/unit/setup"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
  setupTestFrameworkScriptFile: "mock-local-storage",
  collectCoverageFrom: [
    "components/**/*.{js,vue}",
    "!components/icons/**",
    "layouts/**/*.{js,vue}",
    "pages/**/*.{js,vue}",
    "store/**/*.js",
    "!**/node_modules/**"
  ],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Report",
        outputPath: "<rootDir>/test/results/automation-report.html",
        includeFailureMsg: "true"
      }
    ]
  ]
};
