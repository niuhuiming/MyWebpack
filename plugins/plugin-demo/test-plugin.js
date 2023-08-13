/*
 * 1.webpack加载webpack.config.js中所有配置, 此时就会new PluginDemo(), 执行插件的constructor
 * 2.webpack创建compiler对象
 * 3.遍历所有的plugins中的插件，调用插件的apply方法
 * 4.执行剩下编译流程（触发各个hooks事件）
 */
class PluginDemo {
  constructor() {
    console.log('constructor');
  }

  apply(compiler) {
    console.log('apply');
    // environment是同步钩子, 所以需要使用tap注册
    compiler.hooks.environment.tap('PluginDemo', () => {
      console.log('environment');
    });
    // emit是异步串行钩子
    compiler.hooks.emit.tap('PluginDemo', (compilation) => {
      console.log('emit');
    });
    compiler.hooks.emit.tapAsync('PluginDemo', (compilation, callback) => {
      setTimeout(() => {
        console.log('emit async');
        callback();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise('PluginDemo', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit promise');
          resolve();
        }, 1000);
      })
    });
    // make是异步并行钩子
    compiler.hooks.make.tapAsync('PluginDemo', (compilation, callback) => {
      setTimeout(() => {
        console.log('make');
        callback();
      }, 1000);
    });
  }
}

module.exports = PluginDemo;
