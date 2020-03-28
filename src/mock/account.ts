export default {
  '/api/v1/account/login': {
    post: {
      enabled: true, // 是否开启
      response: {
        // mock 规则
        code: '0',
        data: {
          token: '@string(20)',
        },
      },
    },
  },
}
