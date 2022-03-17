import * as core from '@actions/core'

export interface Inputs {
  ipaddr: string
  username: string
  password: string
  commands: string[]
}

export function getInputs(): Inputs {
  return {
    ipaddr: core.getInput('ipaddr'),
    username: core.getInput('username'),
    password: core.getInput('password'),
    commands: core.getMultilineInput('command')
  }
}

export function getInputsForTest(): Inputs {
  return {
    ipaddr: '***.***.***.***',
    username: 'service',
    password: '********',
    commands: ['docker images', 'docker ps -a', 'docker info']
  }
}
