module.exports = {
  development: {
    requestTimeout: 15000, // axios 请求的超时时间，单位毫秒，0表示无超时时间
    mock: true, // 是否开启 mock，修改后需要重新运行 npm run dev
    devServer: {
      // devServer 设置，透传给 webpack
      port: 8000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: '',
          secure: false,
          changeOrigin: true
        }
      }
    }
  },
  production: {
    requestTimeout: 15000,
    mock: true // 是否开启 mock，开启后 api 请求直接本地 mock 生成，不走 nginx 转发
  }
}
