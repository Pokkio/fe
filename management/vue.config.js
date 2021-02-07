const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('network', resolve('src/network'))
      .set('views', resolve('src/views'))
      .set('common', resolve('src/common'))
      .set('mock', resolve('src/mock'))
  }
}