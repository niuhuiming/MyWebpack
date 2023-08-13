/*
 * raw loader: 接收到的content是二进制数据
 */
module.exports = function (content, map, meta) {
  console.log('loader3');
  return content;
}

module.exports.raw = true;
