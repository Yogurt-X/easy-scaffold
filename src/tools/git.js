import download from 'download-git-repo';
import request from './request';
import { orgName } from '../../config';

class Git {
  constructor() {
    this.orgName = orgName;
  }

  // 获取项目列表
  getProjectList() {
    return request(`/orgs/${this.orgName}/repos`);
  }

  // 获取项目版本号列表
  getProjectVersions(repo) {
    return request(`/repos/${this.orgName}/${repo}/tags`);
  }

  // 获取项目地址
  getProjectUrl() {
    console.log('getProjectUrl', this);
  }

  /**
   * 下载项目
   * @param {Object}
   * @param repo 项目名称
   * @param version 项目版本
   * @param repoPath 本地开发目录
   *
   */
  downloadProject({ repo, version, repoPath }) {
    return new Promise((resolve, reject) => {
      download(`${this.orgName}/${repo}#${version}`, repoPath, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

export default Git;
