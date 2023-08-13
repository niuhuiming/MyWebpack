class AnalyzeWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compilation) => {
      // 1.遍历所有即将输出的文件, 得到其大小
      const assets = Object.entries(compilation.assets);
      // 2.生成一个md文件
      let source = "# 分析打包资源大小 \n| 名称 | 大小 |\n| --- | --- |";
      assets.forEach(([filename, file]) => {
        source += `\n| ${filename} | ${file.size()} |`;
      });
      // 添加资源
      compilation.assets["analyze.md"] = {
        source() {
          return source;
        },
        size() {
          return source.length;
        },
      };
    })
  }
}

module.exports = AnalyzeWebpackPlugin;
