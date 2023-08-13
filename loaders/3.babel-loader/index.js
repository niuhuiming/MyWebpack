const babel = require('@babel/core');
const schema = require('./schema.json');

// https://www.babeljs.cn/docs/babel-core

module.exports = function (content) {
  const callback = this.async();
  const options = this.getOptions(schema);

  babel.transform(content, options, function (err, res) {
    callback(err, res.code);
  });
}
