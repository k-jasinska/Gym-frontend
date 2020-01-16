const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api2', {
      target: 'http://localhost:3001/',
      secure: false,
      xfwd: true,
      autoRewrite: true,
      changeOrigin: true,
      followRedirects: true
    })
  );
};
