import * as core from '@actions/core'
import * as context from './context'

/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
  if (
    checkParameterIsNull(inputs.ipaddr) ||
    checkParameterIsNull(inputs.username) ||
    checkParameterIsNull(inputs.password)
  ) {
    core.info('Please fill all the required parameters')
    return false
  }

  if (!checkIPV4Addr(inputs.ipaddr)) {
    core.info('ip address not correct')
    return false
  }

  if (inputs.commands.length === 0) {
    core.info('can not find any ssh command')
    return false
  }
  return true
}

/**
 * 检查是否是正常的IP地址
 * @param ipaddr
 * @returns
 */
export function checkIPV4Addr(ipaddr: string): boolean {
  return context.IPREGX.test(ipaddr)
}

/**
 * 判断字符串是否为空
 * @param parameter
 * @returns
 */
export function checkParameterIsNull(parameter: string): boolean {
  return (
    parameter === undefined ||
    parameter === null ||
    parameter === '' ||
    parameter.trim().length == 0
  )
}

/**
 *
 * @param commands 检查是否有影响操作系统安全的高危命令
 * @returns
 */
export function checkCommandsDanger(commands: string[]): boolean {
  let isCommandsDanger = false
  for (let i = 0; i < commands.length; i++) {
    if (checkCommandDanger(commands[i])) {
      isCommandsDanger = true
      break
    }
  }
  // for (const command in commands) {
  //   if (checkCommandDanger(command)) {
  //     isCommandsDanger = true
  //     break
  //   }
  // }
  return isCommandsDanger
}

/**
 * 检查命令行中是否有黑名单中的高危命令
 * @param command
 * @returns
 */
export function checkCommandDanger(command: string): boolean {
  let isCommandDanger = false
  for (const danCommand in context.dangerCommandSet) {
    if (command.includes(danCommand)) {
      core.info(
        'find danger operation "' +
          danCommand +
          '" in command line "' +
          command +
          '",please remove it '
      )
      isCommandDanger = true
    }
  }
  return isCommandDanger
}
