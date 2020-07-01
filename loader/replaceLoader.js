// Loader就是⼀个函数，声明式函数，不能用箭头函数
const loaderUtils = require('loader-utils')

module.exports = function (source) {

  return source.replace('my-loader', "MYLOADER")
}