const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true
    })
  );
  app.use(
    '^/attachment',
    createProxyMiddleware({
      // target: 'https://attachment.dev.fatalent.cn',
      target: 'https://attachment.dev.fatalent.cn',
      changeOrigin: true
    })
  );
};
