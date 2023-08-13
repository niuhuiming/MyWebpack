/*
 * 异步loader: 在异步操作执行完之后才会执行下一个loader
 */
module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    console.log('loader2');
    callback(null, content, map, meta);
  }, 1000);
}
