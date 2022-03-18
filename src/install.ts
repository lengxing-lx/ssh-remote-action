import * as core from '@actions/core'
import * as io from '@actions/io'
import * as cp from 'child_process'
import * as os from 'os'

/**
 * 检查系统上是否安装了sshpass,如果没有，会尝试进行安装，如果安装不成功，则提示安装失败，结束操作
 * @returns
 */
export async function installSshPassOnSystem(): Promise<boolean> {
  const isInstalld = await checkSshpassInstall()
  core.info(`is install ${isInstalld}`)
  if (isInstalld) {
    core.info('sshPass already installed and set to the path')
    return isInstalld
  } else {
    core.info('start install sshpass')
    let platform = os.platform()
    installSshPassByPlatformAndArch(platform)
    return checkSshpassInstall()
  }
}

/**
 * 检查sshpass是否已经在系统上完成安装，并输出版本
 * @returns
 */
export async function checkSshpassInstall(): Promise<boolean> {
  let sshPass = await io.which('sshpass')
  if (!sshPass) {
    core.info('sshPass not installed or not set to the path')
    return false
  } else {
    core.info('sshPass already installed and set to the path')
    let sshPassVersion = (cp.execSync(`${sshPass} -V`) || '').toString()
    core.info(sshPassVersion)
    return true
  }
}

/**
 * 针对不同操作系统完成sshpass安装，可以细分为macos,linux-centos,linux-ubunto,windows等
 * @param platform
 * @param arch
 */
export async function installSshPassByPlatformAndArch(
  platform: string
): Promise<void> {
  if (platform === 'darwin') {
    await installSshPassOnMacos()
  }
  if (platform === 'linux') {
    await installSshPassOnLinux()
  }
}

export async function installSshPassOnMacos(): Promise<void> {
  await (
    cp.execSync(
      `xcode-select --install && wget https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb && brew install sshpass.rb`
    ) || ''
  ).toString()
}

export async function installSshPassOnLinux(): Promise<void> {
  const osRelease = await (cp.execSync(`cat /etc/os-release`) || '').toString()
  if (osRelease.indexOf('Ubuntu') > -1) {
    core.info('current system is Ubuntu,use apt-get to install sshpass')
    const installUbuntuResult = await (
      cp.execSync(`apt-get -y -q update && apt-get -y install -q sshpass`) || ''
    ).toString()
    core.info(installUbuntuResult)
  } else if (osRelease.indexOf('CentOS') > -1) {
    core.info('current system is Centos,use yum to install sshpass')
    let installCentosResult = await (
      cp.execSync(`yum -y install -q sshpass`) || ''
    ).toString()
    core.info(installCentosResult)
  }
}
