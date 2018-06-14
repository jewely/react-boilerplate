const path = require('path')

module.exports = {
  dev: {
    port: 7788,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    env: {
      NODE_ENV: '"development"',
    },
  },
  build: {
    env: {
      NODE_ENV: '"production"',
    },
  },
}
