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