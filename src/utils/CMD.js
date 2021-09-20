const { exec } = require('child_process');
const errorMsg = require('./errorMsg');
const {
  red,
  green,
  yellow,
} = require('./log');

async function CMD(path, execCode, tips = '') {
  return new Promise((resolve) => {
    exec(execCode, {
      cwd: path,
    }, (err, stdout) => {
      if (err) {
        const errObj = errorMsg(JSON.stringify(err.message));
        errObj && yellow(`提示: ${errObj.desc}`);
        errObj && errObj.value && resolve(errObj.value);
        !errObj && red(`error: ${err}`);
        red(`error: ${err}`);
        return;
      };
      tips && green(tips);
      resolve(stdout);
    });
  })
}

const remoteSet = async (path, url) => await CMD(path, `git remote origin set-url ${url}`, `已修改远程仓库地址`);
const remoteDel = async (path) => await CMD(path, `git remote rm origin`, `已删除远程仓库地址`);
const remoteAdd = async (path, url) => await CMD(path, `git remote add origin ${url}`, `已配置远程仓库地址`);
const branch = async (path, branch = 'dev') => await CMD(path, `git branch ${branch}`, `已创建${branch}分支`);
const init = async (path) => await CMD(path, 'git init', '已初始化');
const add = async (path) => await CMD(path, 'git add .', '已添加到暂存区');
const commit = async (path, msg = '提交') => await CMD(path, `git commit -m ${msg}`, '已添加到本地仓库');
const push = async (path) => await CMD(path, `git push`, '已推送到远程仓库');
const pushOrigin = async (path, branch = 'master') => await CMD(path, `git push -u origin ${branch}`, `已推送${branch}分支到远程仓库`);
const pushUpStream = async (path, branch = 'dev') => await CMD(path, `git push --set-upstream origin ${branch}`, `已与远程${branch}分支建立连接并推送`);
const pull = async (path) => await CMD(path, `git pull`, '已从远程仓库拉取代码');
const checkout = async (path, branch = 'test') => await CMD(path, `git checkout ${branch}`, `已切换${branch}分支`);
const merge = async (path, branch = 'dev') => await CMD(path, `git merge ${branch}`, `已与${branch}分支合并`);

const execCMD = {
  CMD,
  add,
  commit,
  push,
  pushOrigin,
  pushUpStream,
  checkout,
  merge,
  pull,
  init,
  branch,
  remoteAdd,
  remoteDel,
  remoteSet,
}

module.exports = {
  execCMD,
};