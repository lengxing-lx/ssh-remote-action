import * as core from '@actions/core'
import * as context from './context'

/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
  if (
    checkObejectIsNull(inputs.ipaddr) ||
    checkObejectIsNull(inputs.username) ||
    checkObejectIsNull(inputs.password)
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
  let ipRegx = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))(\.|$)){4}$/
  return ipRegx.test(ipaddr) ? true : false
}

/**
 * 判断字符串是否为空
 * @param s
 * @returns
 */
export function checkObejectIsNull(s: string): boolean {
  if (s == undefined || s == null || s == '' || s.trim().length == 0) {
    return true
  }
  return false
}
