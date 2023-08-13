/*
 * 同步loader
 */
module.exports = function (content, map, meta) {
  /*
   * callback接收4个参数
   * 1.error: 代表是否有错误
   * 2.content: 处理后的内容
   * 3.source-map: 继续传递source-map
   * 4.meta: 给下一个loader传递参数
   */
  console.log('loader1');
  this.callback(null, content, map, meta);
}
