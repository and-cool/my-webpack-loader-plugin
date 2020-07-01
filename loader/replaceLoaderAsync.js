// Loader就是⼀个函数，声明式函数，不能用箭头函数
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // console.log(this.query)
  // loaderUtils 处理较长参数时会非常方便
  const options = loaderUtils.getOptions(this)
  console.log(options)

  // return source.replace("webpack", options.str)
  const result = source.replace("webpack", options.str)

  // 返回多个结果
  // this.callback(null, result);

  //处理异步, 使用this.async 告诉webpack， 函数内部有异步操作
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace("webpack", options.str)
    // 返回多个结果
    callback(null, result)
  }, 3000)
}