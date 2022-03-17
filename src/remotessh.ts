import * as core from '@actions/core'
import * as cp from 'child_process'
import * as context from './context'

const dangerCommandSet: string[] = [
  'poweroff',
  'rm',
  'mkfs',
  'file',
  'dd',
  'shutdown'
]

export async function execRemoteSSHCommands(
  inputs: context.Inputs
): Promise<void> {
  for (var i = 0; i < inputs.commands.length; i++) {
    core.info('exec current command ' + inputs.commands[i])
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

export async function execRemoteSSHCommand(sshcommand: string): Promise<void> {
  core.info('current full command ' + sshcommand)
  let sshpassCommandResult = await (cp.execSync(sshcommand) || '').toString()
  core.info('sshpassCommandResult ' + sshpassCommandResult)
}

export function checkCommandsDanger(commands: string[]): boolean {
  var isCommandsDanger: boolean = false
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i]
    if (checkCommandDanger(command)) {
      isCommandsDanger = true
      break
    }
  }
  return isCommandsDanger
}

/**
 * 检查命令行中是否有黑名单中的高危命令
 * @param command
 * @returns
 */
export function checkCommandDanger(command: string): boolean {
  core.info('current command ' + command)
  let isCommandDanger = false
  for (var i = 0; i < dangerCommandSet.length; i++) {
    core.info('current check ' + dangerCommandSet[i])
    if (command.indexOf(dangerCommandSet[i]) > -1) {
      core.info(
        'find danger command ' + dangerCommandSet[i] + ' in command ' + command
      )
      isCommandDanger = true
    }
  }
  i
  return isCommandDanger
}
