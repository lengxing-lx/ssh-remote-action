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
  }

  core.info('start install sshpass')
  let platform = os.platform()
  installSshPassByPlatform(platform)
  return checkSshpassInstall()
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
  }
  core.info('sshPass already installed and set to the path')
  let sshPassVersion = (cp.execSync(`${sshPass} -V`) || '').toString()
  core.info(sshPassVersion)
  return true
}

/**
 * 针对不同操作系统完成sshpass安装，可以细分为macos,linux-centos,linux-ubunto,windows等
 * @param platform
 */
export async function installSshPassByPlatform(
  platform: string
): Promise<void> {
  if (platform === 'darwin') {
    await installSshPassOnMacos()
  }
  if (platform === 'linux') {
    await installSshPassOnLinux()
  }
}

/**
 * mac系统安装sshpass
 * 有可能先要完成xcode-select 的安装，可以执行 xcode-select --install
 */
export async function installSshPassOnMacos(): Promise<void> {
  core.info('current system is Ubuntu,use apt-get to install sshpass')
  await (
    cp.execSync(
      `wget https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb && brew install sshpass.rb`
    ) || ''
  ).toString()
}

/**
 * 在当前的linux系统上安装sshpass
 * 目前支持centos和ubunto
 * 后面会扩充到所有常用的linux发行版，如readhat,debain,open SUSE等，
 */
export async function installSshPassOnLinux(): Promise<void> {
  const osRelease = await (cp.execSync(`cat /etc/os-release`) || '').toString()
  let installCommand: string = 'yum -y install -q sshpass'

  if (osRelease.indexOf('Ubuntu') > -1 || osRelease.indexOf('Debain')) {
    core.info('current system is Ubuntu,use apt-get to install sshpass')
    installCommand = `apt-get -y -q update && apt-get -y install -q sshpass`
  }

  if (osRelease.indexOf('CentOS') > -1) {
    core.info('current system is Centos,use yum to install sshpass')
    installCommand = `yum -y install -q sshpass`
  }

  if (osRelease.indexOf('Fedora') > -1) {
    core.info('current system is Fedor,use Dnf to install sshpass')
    installCommand = `dnf install -y sshpass`
  }

  if (osRelease.indexOf('SUSE') > -1) {
    core.info('current system is OpenSuSE,use Zypper to install sshpass')
    installCommand = `zypper in docker`
  }
  await installSshPassByCommand(installCommand)
}

/**
 * 根据传入的命令完成sshpass的安装
 * @param command
 */
export async function installSshPassByCommand(command: string): Promise<void> {
  core.info('current system is Ubuntu,use apt-get to install sshpass')
  const installSshPassResult = await (cp.execSync(command) || '').toString()
  core.info(installSshPassResult)
}
