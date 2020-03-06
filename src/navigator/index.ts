/**
 * 配置导航
 */
export default [
  {
    path: '/',
    icon: 'dashboard',
    title: 'Dashboard'
  },
  {
    path: '/error',
    icon: 'warning',
    title: '错误页面',
    children: [
      {
        path: '/403',
        title: '403'
      },
      {
        path: '/404',
        title: '404'
      },
      {
        path: '/500',
        title: '500'
      }
    ]
  },
  {
    path: '/table',
    icon: 'unordered-list',
    title: '表格示例',
    children: [
      {
        path: '/table/base',
        title: '基础表格'
      },
      {
        path: '/table/advance',
        title: '高级表格'
      }
    ]
  },
  {
    path: '/form',
    icon: 'form',
    title: '表单示例'
  }
]
