"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.checkCommandDanger = exports.checkCommandsDanger = exports.execRemoteSSHCommand = exports.execRemoteSSHCommands = void 0;
var core = require("@actions/core");
var cp = require("child_process");
var dangerCommandSet = [
    'poweroff',
    'reboot',
    'rm',
    'mkfs',
    'file',
    'dd',
    'shutdown'
];
function execRemoteSSHCommands(inputs) {
    return __awaiter(this, void 0, void 0, function () {
        var i, sshpassCommand;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < inputs.commands.length)) return [3 /*break*/, 4];
                    core.info('exec command:' + inputs.commands[i]);
                    sshpassCommand = 'sshpass -p ' +
                        inputs.password +
                        ' ssh -o StrictHostKeyChecking=no ' +
                        inputs.username +
                        '@' +
                        inputs.ipaddr +
                        " '" +
                        inputs.commands[i] +
                        "'";
                    return [4 /*yield*/, execRemoteSSHCommand(sshpassCommand)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.execRemoteSSHCommands = execRemoteSSHCommands;
function execRemoteSSHCommand(sshcommand) {
    return __awaiter(this, void 0, void 0, function () {
        var sshpassCommandResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (cp.execSync(sshcommand) || '').toString()];
                case 1:
                    sshpassCommandResult = _a.sent();
                    core.info('result ' + sshpassCommandResult);
                    return [2 /*return*/];
            }
        });
    });
}
exports.execRemoteSSHCommand = execRemoteSSHCommand;
function checkCommandsDanger(commands) {
    var isCommandsDanger = false;
    for (var i = 0; i < commands.length; i++) {
        var command = commands[i];
        if (checkCommandDanger(command)) {
            isCommandsDanger = true;
            break;
        }
    }
    return isCommandsDanger;
}
exports.checkCommandsDanger = checkCommandsDanger;
/**
 * 检查命令行中是否有黑名单中的高危命令
 * @param command
 * @returns
 */
function checkCommandDanger(command) {
    var isCommandDanger = false;
    for (var i = 0; i < dangerCommandSet.length; i++) {
        if (command.indexOf(dangerCommandSet[i]) > -1) {
            core.info('find danger operation \"' + dangerCommandSet[i] + '\" in command line "' + command + '\",please remove it ');
            isCommandDanger = true;
        }
    }
    i;
    return isCommandDanger;
}
exports.checkCommandDanger = checkCommandDanger;
