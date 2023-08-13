module.exports = function (content) {
  /*
   * 1.直接使用style-loader, 只能处理样式，不能处理样式中引入的其他资源
   *  use: ['./loaders/5.style-loader']
   * 2.借助css-loader解决样式中引入其他资源的问题
   *  use: ['./loaders/5.style-loader', 'css-loader']
   *  问题是css-loader暴露的是js代码, style-loader需要执行js代码，得到返回值再动态创建style标签插入到页面上, 不好操作
   * 3.style-loader使用pitch-loader用法
   */
  // const script = `
  //   const styleEl = document.createElement('style');
  //   styleEl.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEl);
  // `;
  // return script;
}

// remainingRequest: 剩下还需要处理的loader
module.exports.pitch = function (remainingRequest) {
  // 1.将remainingRequest中的绝对路径改为相对路径, 因为后续需要使用相对路径进行操作
  const relativePath = remainingRequest
    .split('!')
    .map(absolutePath => this.utils.contextify(this.context, absolutePath))
    .join('!');
  // 2.引入css-loader处理后的资源
  // 3.创建style标签, 将内容插入到页面中生效
  const script = `
    import style from '!!${relativePath}';
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  `;
  // 终止后面的loader执行
  return script;
}
