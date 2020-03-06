## react-antd-ts-rematch-template

- 一个基于 react + antd + typescript + rematch 的单页应用模板

### 版本更新

- [CHANGELOG](./CHANGELOG.md)

### 文档

- [todo](docs/todo.md)
- [style 规范](docs/style.md)
- [commit 规范](docs/commit.md)
- [mock 语法](docs/mock.md)
- [model&service 说明](docs/model-service.md)
- [自动构建及部署](docs/cicd.md)

### Get Start

- 命令
  - 安装依赖：`npm i`
  - 本地开发：`npm run dev`
  - 打包发布：`npm run build`
  - 运行测试：`npm run test`
  - 查看打包后的文件体积：`npm run analyse`
  - 检查代码及修复：`npm run lint` `npm run lint:fix`
- 开发流程
  - 1.创建项目仓库 -> 确定 `pages`, `models`, `services` 各个目录的结构 -> 技术设计 review -> 开始开发
  - 2.配置 mock 规则为 services 层提供数据，开始开发页面部分，此时可不依赖接口
  - 3.与后端确定接口，使用 mock，修改 services 层适配数据
  - 4.与后端真实接口进行联调，修改 services 层适配数据
  - 5.还原 UI 设计图
  - 6.自测，提测，交付
- [配置文件](webpack/env.js)
  - `mock` 本地开发时是否开启本地 mock 功能，如果开启，需要配置 [mock 规则](src/mock), [mock 语法](docs/mock.md)
  - `devServer` 本地开发时的一些地址及端口配置，会透传给 webpack
- [开发一个新功能](docs/model-service.md)
- 编辑器设置
  - [WebStorm]()
  - [vscode]()
- commit 规范
  - [git commit 提交规范](docs/commit.md)
  - `<type>(<scope>): <subject>`
  - type: `feat`, `fix`, `docs`, `style`, `format`, `refactor`, `deps`, `chore`, `perf`, `test`, `revert`
  - 示例：`feat: 新增xx功能`

### 文件说明

```
react-antd-ts-rematch-template
├── webpack                 // webpack 配置文件
│   ├── env.js              // 环境配置
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js
├── scripts                 // 部署及其他脚本
│   ├── build.sh
│   └── deploy.sh
├── docs                    // 文档
├── src                     // 业务代码
│   ├── assets              // 静态资源
│   │   └── images          // 图片
│   ├── components          // 公共组件
│   │   ├── Bread           // 面包屑导航
│   │   ├── HeaderBar       // 顶栏
│   │   └── SideMenu        // 侧边栏导航
│   ├── config              // 配置目录
│   │   ├── constants.ts    // 常量定义
│   │   └── errors.ts       // 错误码配置
│   ├── mock                // mock配置
│   │   └── index.ts
│   ├── models              // 数据模型
│   │   └── index.ts
│   ├── pages               // 业务模块
│   │   ├── Main
│   │   └── Account
│   ├── navigator           // 导航
│   │   └── index.ts        // 导航配置
│   ├── routers             // 路由
│   │   └── config.ts       // 路由配置
│   ├── schemas             // 业务类型定义
│   ├── services            // 数据服务层
│   │   ├── request.ts      // 网络请求封装
│   │   └── index.ts
│   ├── styles
│   │   ├── global.less     // 全局样式
│   │   └── variables.less  // 样式变量
│   ├── types               // 申明文件
│   ├── utils               // 工具
│   │   └── helpers.ts      // 工具函数
│   ├── App.tsx
│   ├── store.ts
│   ├── index.html
│   └── index.tsx
├── README.md
├── package-lock.json
└── package.json
```

### 技术栈

- 框架：`react`
- 路由：`react-router-dom`
- 数据管理：`rematch`
- 界面：`antd`
- 网络库：`axios`
- 按需加载：`@loadable/component`
- 热更新：`react-hot-loader`
- 单元测试：`enzyme`, `jest`
- 代码格式统一：`Prettier`
- TypeScript 规范：[eslint](.eslintrc.json)
- Less 规范：[stylelint](.stylelintrc.js)
- pre-commit
  - 调用 ESLint 对不规范的代码进行自动 fix
  - 调用 stylelint 对不规范的样式进行自动 fix
  - 调用 commitlint 对 commit message 进行规范检查
