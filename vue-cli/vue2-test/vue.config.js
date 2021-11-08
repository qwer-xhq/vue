module.exports = {
  lintOnSave: false,

  // 开启代理服务器（方式一）
  // devServer: {
  //   proxy: 'http://localhost:5000'
  // }

  // 开启代理服务器（方式二)
  devServer: {
    proxy: {
      '/students': {
        target: 'http://localhost:5000',
        pathRewrite:{'^/students':''}
        // ws: true,
        // changeOrigin: true
      },
      '/cars': {
        target: 'http://localhost:5001',
        pathRewrite:{'^/cars':''}
        // ws: true,
        // changeOrigin: true
      },
    }
  }
}