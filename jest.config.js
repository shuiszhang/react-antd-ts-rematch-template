const merge = require('webpack-merge')
const paths = require('./tsconfig.json').compilerOptions.paths

let moduleNameMapper = {}
Object.entries(paths).forEach(item => {
  const name = item[0].replace(/\/\*$/, '/(.*)')
  const value = item[1][0].replace(/\*$/, '$1')
  moduleNameMapper[name] = '<rootDir>/' + value
})

const config = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/setup.ts']
}

module.exports = merge(config, { moduleNameMapper })
