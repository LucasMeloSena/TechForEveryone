const nextJest = require("next/jest")
const { loadEnvConfig } = require("@next/env")

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ['node_modules', "<rootDir>"]
})
const projectDir = process.cwd()
loadEnvConfig(projectDir)

module.exports = jestConfig