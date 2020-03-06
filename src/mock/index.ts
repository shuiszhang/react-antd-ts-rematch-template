const context = require.context('./', false, /\.ts$/)

export default context
  .keys()
  .filter(item => item !== './index.ts')
  .reduce((pre, cur) => ({ ...pre, ...context(cur).default }), {})
