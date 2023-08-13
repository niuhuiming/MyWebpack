/*
 * pitch loader: pitch方法会在所有loader执行前执行
 * 与loader先右后左的执行顺序不同, pitch方法的执行顺序是先左后右, 类似事件捕获与事件冒泡
 * 在执行各个pitch方法的过程中如果某个pitch有返回值, 就不再执行后面的pitch和loader, 而是直接执行前面的loader,
 * 类似在事件捕获阶段遇到某个条件直接开始事件冒泡，不再触发后面元素的事件捕获和事件冒泡
 */
module.exports = function (content, map, meta) {
  console.log('loader4');
  this.callback(null, content, map, meta);
}

module.exports.pitch = function () {
  console.log('loader4 pitch');
}
