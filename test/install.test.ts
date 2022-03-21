import * as utils from '../src/utils'
import {expect, test} from '@jest/globals'
import * as install from '../src/install'
import * as context from '../src/context'

test('check install', () => {
  expect(install.checkSshpassInstall()).toEqual(false)
  //expect(install.installSshPassOnSystem()).toEqual(false);
})
