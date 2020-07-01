### 自定义loader
```js
  resolveLoader: {
    modules: ['node-modules', './loader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'replaceLoader',
          {
          loader: 'replaceLoaderAsync',
          options: {
            str: 'my-loader'
          }
        }]
      }
    ]
  },
```
```js
// Loader就是⼀个函数，声明式函数，不能用箭头函数
const loaderUtils = require('loader-utils')

module.exports = function (source) {

  return source.replace('my-loader', "MYLOADER")
}

```
```js
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

```
### 自定义Plugin
```js
class CopyrightWebpackPlugin {
  // 获取外部参数配置
  constructor(options) {
    console.log('hello plugins')
    console.log(options)
  }
  //compiler:webpack实例例 '
  apply(compiler) {
    // 同步
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation, cb) => {
      console.log('同步hooks执行')
    })
    // 异步
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      console.log(compilation.assets);
      compilation.assets['copyright.txt'] = {
        // 定义文档的内容
        source: function() {
          return 'hello my plugin';
        },
        size: function() {
          return 30;
        }
      }
      cb();
    })
  }
}
module.exports = CopyrightWebpackPlugin;
```
```js
plugins: [
  new CopyrightWebpackPlugin({
    name: "MyPlugin"
  })
]
```