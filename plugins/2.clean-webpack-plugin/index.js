class CleanWebpackPlugin {
  apply(compiler) {
    // 2.获取打包输出目录
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    // 1.注册钩子, 在打包输出前emit
    compiler.hooks.emit.tapAsync('CleanWebpackPlugin', (compilation, callback) => {
      // 3.通过fs删除打包输出目录下的所有文件
      const err = this.removeFiles(fs, outputPath);
      callback(err);
    });
  }

  removeFiles(fs, path) {
    try {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const filePath = `${path}/${file}`;
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
          this.removeFiles(fs, filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(path);
    } catch (e) {
      return e;
    }
  }
}

module.exports = CleanWebpackPlugin;
