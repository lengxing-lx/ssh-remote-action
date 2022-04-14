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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execRemoteSSHCommand = exports.execRemoteSSHCommands = void 0;
const core = __importStar(require("@actions/core"));
const cp = __importStar(require("child_process"));
function execRemoteSSHCommands(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        //  for (const command in inputs.commands) {
        for (let i = 0; i < inputs.commands.length; i++) {
            core.info('exec command:' + inputs.commands[i]);
            const sshpassCommand = 'sshpass -p ' +
                inputs.password +
                ' ssh -o StrictHostKeyChecking=no ' +
                inputs.username +
                '@' +
                inputs.ipaddr +
                " '" +
                inputs.commands[i] +
                "'";
            yield execRemoteSSHCommand(sshpassCommand);
        }
    });
}
exports.execRemoteSSHCommands = execRemoteSSHCommands;
/**
 *
 * @param sshcommand 执行远程命令
 */
function execRemoteSSHCommand(sshcommand) {
    return __awaiter(this, void 0, void 0, function* () {
        const sshpassCommandResult = yield (cp.execSync(sshcommand) || '').toString();
        core.info('result ' + sshpassCommandResult);
    });
}
exports.execRemoteSSHCommand = execRemoteSSHCommand;
