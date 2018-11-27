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

  // 下载项目
  downloadProject() {
    console.log('downloadProject', this);
  }
}

export default Git;
