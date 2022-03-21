import * as core from '@actions/core'
import * as cp from 'child_process'
import * as context from './context'

export async function execRemoteSSHCommands(
  inputs: context.Inputs
): Promise<void> {
  for (var i = 0; i < inputs.commands.length; i++) {
    core.info('exec command:' + inputs.commands[i])
    let sshpassCommand =
      'sshpass -p ' +
      inputs.password +
      ' ssh -o StrictHostKeyChecking=no ' +
      inputs.username +
      '@' +
      inputs.ipaddr +
      " '" +
      inputs.commands[i] +
      "'"
    await execRemoteSSHCommand(sshpassCommand)
  }
}

/**
 *
 * @param sshcommand 执行远程命令
 */
export async function execRemoteSSHCommand(sshcommand: string): Promise<void> {
  let sshpassCommandResult = await (cp.execSync(sshcommand) || '').toString()
  core.info('result ' + sshpassCommandResult)
}
