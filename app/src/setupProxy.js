const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(proxy('/auth',{
    target: 'http://localhost:4000',
    changeOrigin: true
  }))

  app.use(proxy('/auth_callback',{
    target: 'http://localhost:4000',
    changeOrigin: true
  }))
}