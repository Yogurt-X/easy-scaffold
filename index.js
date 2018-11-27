// 兼容 es6, 并导入项目主文件
require('babel-register');
const babel = require('@babel/core');
const babelPresetLatestNode = require('babel-preset-latest-node');

babel.transform('code();', {
  presets: [[babelPresetLatestNode, {
    target: 'current',
  }]],
});

require('babel-polyfill');
require('./src');
