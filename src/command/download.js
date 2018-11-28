// 命令管理工具
import commander from 'commander';
// 命令行交互工具,与用户进行交互
import inquirer from 'inquirer';
// 用来实现node.js命令行环境的loading效果
import ora from 'ora';

import Git from '../tools/git';


class Download {
  constructor() {
    this.git = new Git();
    this.commander = commander;
    this.inquirer = inquirer;
    this.getProList = ora('获取项目列表...');
    this.getTagList = ora('获取项目版本...');
    this.downLoad = ora('正在加速为您下载代码...');
  }

  run() {
    this.commander
      .command('download')
      .description('从远程下载代码到本地...')
      .action(() => { this.download(); });

    this.commander.parse(process.argv);
  }

  async download() {
    let getProListLoad; // 获取项目列表loading
    let getTagListLoad; // 获取项目版本loading
    let downloadLoad; // 获取下载代码到制定目录地址loading
    let repos;
    let version;

    try {
      getProListLoad = this.getProList.start();
      // 获取项目列表
      repos = await this.git.getProjectList();
      getProListLoad.succeed('获取项目列表成功');
    } catch (error) {
      console.log(error);
      getProListLoad.fail('获取项目列表失败...');
      process.exit(-1);
    }

    if (repos.length === 0) {
      console.log('\n可以开发的项目数为 0, 肯定是配置错啦~~\n'.red);
      process.exit(-1);
    }

    const choices = repos.map(({ name }) => name);

    const questions = [
      {
        type: 'list',
        name: 'repo',
        message: '请选择你想要开发的项目类型',
        choices,
      },
    ];

    // 这里获取到用户选择的开发项目类型
    const { repo } = await this.inquirer.prompt(questions);

    // 获取项目的版本，这里默认选择确定项目的最近一个版本
    try {
      getTagListLoad = this.getTagList.start();
      // 获取版本号列表
      [{ name: version }] = await this.git.getProjectVersions(repo);
      getTagListLoad.succeed('获取项目版本成功');
    } catch (error) {
      console.log(error);
      getTagListLoad.fail('获取项目版本失败...');
      process.exit(-1);
    }

    console.log(`您选择的项目是${repo}, 即将下载版本${version}`);

    const repoName = [
      {
        type: 'input',
        name: 'repoPath',
        message: '请输入项目名称：',
        validate(v) {
          const done = this.async();
          if (!v.trim()) {
            done('项目名称不能为空');
          }
          done(null, true);
        },
      },
    ];

    const { repoPath } = await this.inquirer.prompt(repoName);

    try {
      downloadLoad = this.downLoad.start();
      await this.git.downloadProject({ repo, version, repoPath });
      downloadLoad.succeed('下载代码成功');
    } catch (error) {
      console.log(error);
      downloadLoad.fail('下载代码失败...');
    }
  }
}

const D = new Download();
D.run();
