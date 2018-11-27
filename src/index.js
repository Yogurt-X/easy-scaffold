// colors console.log 文本添加字体颜色
import 'colors';

// 执行命令前，从这里检测我们的命令目录下是否已经存在了用户请求的命令，避免了用户误操作程序报错的风险

// 接收命令行参数，提供基础信息提示功能
import commander from 'commander';

// 内部模块
// 以同步的方法检测目录是否存在
import { existsSync } from 'fs';
import { resolve } from 'path';
import { version } from '../package.json';

commander.version(version)
  .parse(process.argv);

// 获取命令行中传入的第一个参数
const [todo = ''] = commander.args;

console.log('todo', todo);

console.log('__dirname', __dirname);

if (existsSync(resolve(__dirname, `command/${todo}.js`))) {
  // 引入并执行command文件夹下的js文件
  require(`./command/${todo}.js`);
} else {
  console.log(
    `
      你输入了未知指令
    `.red,
  );
  process.exit(-1);
}
