import * as core from '@actions/core'
import * as context from './context'
import * as remotessh from './remotessh'
import * as install from './install'
import * as utils from './utils'

export async function run() {
  const inputs: context.Inputs = context.getInputs()
  //const inputs:context.Inputs = context.getInputsForTest();

  //如果参数输入有问题，终止操作
  if (!utils.checkInputs(inputs)) {
    return
  }

  //如果发现命令中有高危操作，停止操作
  const commandsDanger = utils.checkCommandsDanger(inputs.commands)
  if (commandsDanger) {
    core.info('dangerCommand found, terminate process')
    return
  }

  //检查当前环境是否具备远程命令操作条件
  const installSuccess = install.installSshPassOnSystem()
  if (!installSuccess) {
    core.info('can not install sshpass on system')
    return
  }

  //执行远程操作
  remotessh.execRemoteSSHCommands(inputs)
}

run()
