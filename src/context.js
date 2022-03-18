"use strict";
exports.__esModule = true;
exports.getInputsForTest = exports.getInputs = void 0;
var core = require("@actions/core");
function getInputs() {
    return {
        ipaddr: core.getInput('ipaddr'),
        username: core.getInput('username'),
        password: core.getInput('password'),
        commands: core.getMultilineInput('command')
    };
}
exports.getInputs = getInputs;
function getInputsForTest() {
    return {
        ipaddr: "182.92.156.256",
        username: "root",
        password: "Admin123!",
        commands: []
    };
}
exports.getInputsForTest = getInputsForTest;
