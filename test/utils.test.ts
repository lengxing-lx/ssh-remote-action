import * as utils from '../src/utils'
import {expect, test} from '@jest/globals'
import * as context from '../src/context'

test('check ipv4', () => {
  expect(utils.checkIPV4Addr('192.168.1.1')).toEqual(true)
  expect(utils.checkIPV4Addr('0.0.0.0')).toEqual(true)
  expect(utils.checkIPV4Addr('256.1.1.2')).toEqual(false)
  expect(utils.checkIPV4Addr('10.197.68.254')).toEqual(true)
  expect(utils.checkIPV4Addr('10.197.68.256')).toEqual(false)
  expect(utils.checkIPV4Addr('10.197.68.256.19')).toEqual(false)
})

test('check inputs', () => {
  const inputs: context.Inputs = {
    ipaddr: '182.92.156.203',
    username: 'root',
    password: '*********',
    commands: ['docker images', 'docker ps -a', 'docker info']
  }

  const inputs1: context.Inputs = {
    ipaddr: '182.92.156.203',
    username: '',
    password: '',
    commands: ['docker images', 'docker ps -a', 'docker info']
  }

  const inputs2: context.Inputs = {
    ipaddr: '182.92.156.203',
    username: 'root',
    password: '*********',
    commands: []
  }

  const inputs3: context.Inputs = {
    ipaddr: '182.92.156.203.255',
    username: 'root',
    password: '*********',
    commands: ['docker images', 'docker ps -a', 'docker info']
  }
  const inputs4: context.Inputs = {
    ipaddr: '182.92.156',
    username: 'root',
    password: '*********',
    commands: ['docker images', 'docker ps -a', 'docker info']
  }
  expect(utils.checkInputs(inputs)).toEqual(true)
  expect(utils.checkInputs(inputs1)).toEqual(false)
  expect(utils.checkInputs(inputs2)).toEqual(false)
  expect(utils.checkInputs(inputs3)).toEqual(false)
  expect(utils.checkInputs(inputs4)).toEqual(false)
})

test('check commands danger', () => {
  let commands1: string[] = [
    'ps -ef | grep java',
    'ls -la',
    '/usr/local/tomcat/bin/stop.sh'
  ]
  let commands2: string[] = ['reboot -f']
  let commands3: string[] = ['rm -rf']
  expect(utils.checkCommandsDanger(commands1)).toEqual(false)
  expect(utils.checkCommandsDanger(commands2)).toEqual(true)
  expect(utils.checkCommandsDanger(commands3)).toEqual(true)
})
