module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 样式改变
        'format', // 代码格式改变
        'refactor', // 代码重构
        'deps', // 依赖升级变更
        'perf', // 性能优化
        'test', // 测试 case
        'chore', // 构建工具变更
        'revert' // 撤销某次 commit
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
