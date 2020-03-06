/**
 * 配置路由
 * 接受如下几种形式
 * (1)'/a/b': 'path/to/module' // 最常用，注意：path/to/module 是相对于 src/modules/ 的路径
 * (2)'/a/c: {component: 'path/to/module', exact: false}  // 增加 exact: false，对路径进行模糊匹配
 * (3)'/a/d': {redirect: '/a/b'}  // 重定向
 */
export const mainRouters = {
  '/': 'Dashboard',
  '/table/base': 'Table/Basic',
  '/table/advance': 'Table/Advance'
}
