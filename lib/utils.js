"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommandDanger = exports.checkCommandsDanger = exports.checkParameterIsNull = exports.checkIPV4Addr = exports.checkInputs = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
    if (checkParameterIsNull(inputs.ipaddr) ||
        checkParameterIsNull(inputs.username) ||
        checkParameterIsNull(inputs.password)) {
        core.info('Please fill all the required parameters');
        return false;
    }
    if (!checkIPV4Addr(inputs.ipaddr)) {
        core.info('ip address not correct');
        return false;
    }
    if (inputs.commands.length === 0) {
        core.info('can not find any ssh command');
        return false;
    }
    return true;
}
exports.checkInputs = checkInputs;
/**
 * 检查是否是正常的IP地址
 * @param ipaddr
 * @returns
 */
function checkIPV4Addr(ipaddr) {
    return context.IPREGX.test(ipaddr);
}
exports.checkIPV4Addr = checkIPV4Addr;
/**
 * 判断字符串是否为空
 * @param parameter
 * @returns
 */
function checkParameterIsNull(parameter) {
    return (parameter === undefined ||
        parameter === null ||
        parameter === '' ||
        parameter.trim().length == 0);
}
exports.checkParameterIsNull = checkParameterIsNull;
/**
 *
 * @param commands 检查是否有影响操作系统安全的高危命令
 * @returns
 */
function checkCommandsDanger(commands) {
    let isCommandsDanger = false;
    for (let i = 0; i < commands.length; i++) {
        if (checkCommandDanger(commands[i])) {
            isCommandsDanger = true;
            break;
        }
    }
    // for (const command in commands) {
    //   if (checkCommandDanger(command)) {
    //     isCommandsDanger = true
    //     break
    //   }
    // }
    return isCommandsDanger;
}
exports.checkCommandsDanger = checkCommandsDanger;
/**
 * 检查命令行中是否有黑名单中的高危命令
 * @param command
 * @returns
 */
function checkCommandDanger(command) {
    let isCommandDanger = false;
    for (const danCommand in context.dangerCommandSet) {
        if (command.includes(danCommand)) {
            core.info('find danger operation "' +
                danCommand +
                '" in command line "' +
                command +
                '",please remove it ');
            isCommandDanger = true;
        }
    }
    return isCommandDanger;
}
exports.checkCommandDanger = checkCommandDanger;
