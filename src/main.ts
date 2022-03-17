import * as core from '@actions/core'
import * as context from './context'
import * as remotessh from './remotessh'

run()

export async function run() {
  //检查并安装远程命令工具
  //const inputs:context.Inputs = context.getInputs();
  const inputs: context.Inputs = context.getInputsForTest()

  if (inputs.commands.length === 0) {
    core.info('can not find any ssh command found in commands')
    return
  }
  //如果发现命令中有高危操作，停止操作
  const commandsDanger = remotessh.checkCommandsDanger(inputs.commands)
  if (commandsDanger) {
    core.info('dangerCommand found, terminate process')
    return
  }

  //检查当前环境是否具备远程命令操作条件
  /**
  const installSuccess = install.installSshPassOnSystem();
  if(!installSuccess){
    core.info("can not install sshpass on system");
    return;
  }
 */
  //执行远程操作
  remotessh.execRemoteSSHCommands(inputs)
}
