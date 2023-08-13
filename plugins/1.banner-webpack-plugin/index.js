class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    const extensions = ['css', 'js'];
    const prefix = `/*
* Author: ${this.options.Author}
*/
`;
    // 在资源输出前触发
    compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, callback) => {
      // 1.获取即将输出的资源: compilation.assets
      // 2.过滤, 只保留js和css资源
      const assetPaths = Object.keys(compilation.assets).filter(assetsPath => {
        const splitted = assetsPath.split('.');
        const extension = splitted[splitted.length - 1];
        return extensions.includes(extension);
      });
      // 3.遍历剩下资源添加上注释
      assetPaths.forEach(assetPath => {
        // 获取原来文件的内容
        const asset = compilation.assets[assetPath].source();
        const source = prefix + asset;
        // 修改资源
        compilation.assets[assetPath] = {
          // 最终资源输出时调用source方法, source方法的返回值就是资源的具体内容
          source: () => source,
          // 资源大小
          size: () => source.length,
        };
      });
      callback();
    });
  }
}

module.exports = BannerWebpackPlugin;
