"use strict";
exports.__esModule = true;
exports.checkObejectIsNull = exports.checkIPV4Addr = exports.checkInputs = void 0;
var core = require("@actions/core");
/**
 * 检查输入的各参数是否正常
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
    if (checkObejectIsNull(inputs.ipaddr) || checkObejectIsNull(inputs.username) || checkObejectIsNull(inputs.password)) {
        core.info("Please fill all the required parameters");
        return false;
    }
    if (!checkIPV4Addr(inputs.ipaddr)) {
        core.info("ip address not correct");
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
    var ipRegx = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))(\.|$)){4}$/;
    return ipRegx.test(ipaddr) ? true : false;
}
exports.checkIPV4Addr = checkIPV4Addr;
/**
 * 判断字符串是否为空
 * @param s
 * @returns
 */
function checkObejectIsNull(s) {
    if (s == undefined || s == null || s == '' || s.trim().length == 0) {
        return true;
    }
    return false;
}
exports.checkObejectIsNull = checkObejectIsNull;
